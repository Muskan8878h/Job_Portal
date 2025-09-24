import moment from "moment";
import html2canvas from "html2canvas";

export const validateEmail = (email) => {
  if (!email.trim()) return 'Email is Required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address.';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password Must be at least 8 characters";
  if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter";
  if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
  return "";
};

export const validateAvatar = (file) => {
  if (!file) return "";

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    return "Avatar must be a JPG or PNG file";
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return "Avatar must be less than 5MB";
  }

  return ""
};

export const getInitials = (name) => {
  if (!name || typeof name !== "string") return ""; // handle undefined or non-string
  return name
    .trim()
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getLightColorFromImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    if (!imageUrl || typeof imageUrl !== 'string') {
      return reject(new Error('invalid image url'));
    }

    const img = new Image();

    if (!imageUrl.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let r = 0, g = 0, b = 0, count = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        const red = imageData[i];
        const green = imageData[i + 1];
        const blue = imageData[i + 2];
        const brightness = (red + green + blue) / 3;

        if (brightness > 180) {
          r += red;
          g += green;
          b += blue;
          count++;
        }
      }

      if (count === 0) {
        resolve('#ffffff');
      }
      else {
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        resolve(`rgb(${r}, ${g}, ${b})`)
      }
    };

    img.onerror = (e) => {
      console.error(`❌ failed to load image:`, e);
      reject(new Error('Image could not be uploaded or is blocked by CORS.'));
    };
  });
};

export function formatYearMonth(yearMonth) {
  return yearMonth ? moment(yearMonth, "YYYY-MM").format("MMM YYYY") : "";
}

export const fixTailwindColors = (element) => {
  if (!element) return;
  const els = element.querySelectorAll("*");
  els.forEach((el) => {
    const style = getComputedStyle(el);
    ["backgroundColor", "color", "borderColor"].forEach((prop) => {
      if (style[prop].includes("oklch")) {
        el.style[prop] = "rgb(0,0,0)";
      }
    });
  });
};

export const sanitizeColorsForCapture = (element) => {
  if (!element) return;

  const allEls = [element, ...element.querySelectorAll("*")];

  allEls.forEach((el) => {
    const style = getComputedStyle(el);

    ["color", "backgroundColor", "borderColor"].forEach((prop) => {
      let value = style[prop] || "";
      if (value.includes("oklch")) {
        el.style[prop] = "rgb(0,0,0)"; // fallback
      }
    });

    // Handle pseudo-elements
    ["::before", "::after"].forEach((pseudo) => {
      const pseudoStyle = getComputedStyle(el, pseudo);
      ["color", "backgroundColor", "borderColor"].forEach((prop) => {
        let val = pseudoStyle[prop] || "";
        if (val.includes("oklch")) {
          el.style.setProperty(`--capture-${prop}`, "rgb(0,0,0)");
        }
      });
    });
  });
};



export async function captureElementAsImage(element) {
  if (!element) throw new Error("No element provided");

  const canvas = await html2canvas(element);
  return canvas.toDataURL("image/png");
}

export const dataURLtoFile = (dataUrl, filename) => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};