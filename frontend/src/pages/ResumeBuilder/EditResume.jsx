import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout1.jsx";
import TitleInput from "../../components/Input/TitleInput.jsx";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { captureElementAsImage, dataURLtoFile, sanitizeColorsForCapture } from "../../utils/helper.js";

import ProfileInfoForm from "./Forms/ProfileInfoForm.jsx";
import ContactInfoForm from "./Forms/ContactInfoForm.jsx";
import WorkExperienceForm from "./Forms/WorkExperienceForm.jsx";
import EducationDetailsForm from "./Forms/EducationDetailsForm.jsx";
import SkillsInfoForm from "./Forms/SkillsInfoForm.jsx";
import ProjectsDetailForm from "./Forms/ProjectsDetailForm.jsx";
import CertificationInfoForm from "./Forms/CertificationInfoForm.jsx";
import AdditionalInfoForm from "./Forms/AdditionalInfoFrom.jsx";
import StepProgress from "../../components/StepProgress";
import RenderResume from "../../components/ResumeTemplates/RenderResume.jsx";
import Modal from "../../components/Modal.jsx";

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState("");

  const steps = [
    "profile-info",
    "contact-info",
    "work-experience",
    "education-info",
    "skills",
    "projects",
    "certifications",
    "additionalInfo",
  ];

  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: [],
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      { company: "", role: "", startDate: "", endDate: "", description: "" },
    ],
    education: [{ degree: "", institution: "", startDate: "", endDate: "" }],
    skills: [{ name: "", progress: 0 }],
    certifications: [{ title: "", issuer: "", year: "" }],
    languages: [{ name: "", progress: 0 }],
    interests: [""],
    projects: [{ title: "", description: "", link: "" }],
  });

  // 🔹 Validation
  const validateAndNext = () => {
    const errors = [];

    switch (currentPage) {
      case "profile-info":
        const { fullName, designation, summary } = resumeData.profileInfo;
        if (!fullName.trim()) errors.push("Full Name is required.");
        if (!designation.trim()) errors.push("Designation is required.");
        if (!summary.trim()) errors.push("Summary is required.");
        break;

      case "contact-info":
        const { email, phone } = resumeData.contactInfo;
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
          errors.push("A valid Email is required.");
        if (!phone.trim()) errors.push("Phone number is required.");
        break;

      case "work-experience":
        resumeData.workExperience.forEach(
          ({ company, role, startDate, endDate }, index) => {
            if (!company.trim())
              errors.push(
                `Company name is required for Work Experience ${index + 1}`
              );
            if (!role.trim())
              errors.push(`Role is required for Work Experience ${index + 1}`);
            if (!startDate.trim() || !endDate)
              errors.push(
                `Start and End Dates are required for Work Experience ${index + 1
                }`
              );
          }
        );
        break;

      case "education-info":
        resumeData.education.forEach(
          ({ degree, institution, startDate, endDate }, index) => {
            if (!degree.trim())
              errors.push(`Degree is required for Education ${index + 1}`);
            if (!institution.trim())
              errors.push(`Institution is required for Education ${index + 1}`);
            if (!startDate.trim() || !endDate)
              errors.push(
                `Start and End Dates are required for Education ${index + 1}`
              );
          }
        );
        break;

      case "skills":
        resumeData.skills.forEach(({ name, progress }, index) => {
          if (!name.trim())
            errors.push(`Skill name is required for Skill ${index + 1}`);
          if (progress < 1 || progress > 100)
            errors.push(
              `Skill progress must be between 1 and 100 in skill ${index + 1}`
            );
        });
        break;

      case "projects":
        resumeData.projects.forEach(({ title, description }, index) => {
          if (!title.trim())
            errors.push(`Project title is required for Project ${index + 1}`);
          if (!description.trim())
            errors.push(
              `Project description is required for Project ${index + 1}`
            );
        });
        break;

      case "certifications":
        resumeData.certifications.forEach(({ title, issuer }, index) => {
          if (!title.trim())
            errors.push(
              `Certification title is required for Certification ${index + 1}`
            );
          if (!issuer.trim())
            errors.push(
              `Certification issuer is required for Certification ${index + 1}`
            );
        });
        break;

      case "additionalInfo":
        if (
          resumeData.languages.length === 0 ||
          !resumeData.languages[0].name?.trim()
        ) {
          errors.push("At least one language is required.");
        }
        if (
          resumeData.interests.length === 0 ||
          !resumeData.interests[0]?.trim()
        ) {
          errors.push("At least one interest is required.");
        }
        break;

      default:
        break;
    }

    if (errors.length > 0) {
      setErrorMsg(errors.join(", "));
      return;
    }

    setErrorMsg("");
    goToNextStep();
  };

  // 🔹 Navigation
  const goToNextStep = () => {
    const currentIndex = steps.indexOf(currentPage);
    if (currentIndex !== -1 && currentIndex < steps.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(steps[nextIndex]);
      setProgress(Math.round((nextIndex / (steps.length - 1)) * 100));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentPage === "additionalInfo") {
      setOpenPreviewModal(true);
    }
  };

  const goBack = () => {
    const currentIndex = steps.indexOf(currentPage);
    if (currentPage === "profile-info") {
      navigate("/dashboard");
      return;
    }
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(steps[prevIndex]);
      setProgress(Math.round((prevIndex / (steps.length - 1)) * 100));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 🔹 Render forms
  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData.profileInfo}
            updateSection={(key, value) =>
              updateSection("profileInfo", key, value)
            }
            onNext={validateAndNext}
          />
        );

      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData.contactInfo}
            updateSection={(key, value) =>
              updateSection("contactInfo", key, value)
            }
          />
        );

      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData.workExperience}
            updateArrayItem={(index, key, value) =>
              updateArrayItem("workExperience", index, key, value)
            }
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            removeArrayItem={(index) =>
              removeArrayItem("workExperience", index)
            }
          />
        );

      case "education-info":
        return (
          <EducationDetailsForm
            educationInfo={resumeData.education}
            updateArrayItem={(index, key, value) =>
              updateArrayItem("education", index, key, value)
            }
            addArrayItem={(newItem) => addArrayItem("education", newItem)}
            removeArrayItem={(index) => removeArrayItem("education", index)}
          />
        );

      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData.skills}
            updateArrayItem={(index, key, value) =>
              updateArrayItem("skills", index, key, value)
            }
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            removeArrayItem={(index) => removeArrayItem("skills", index)}
          />
        );

      case "projects":
        return (
          <ProjectsDetailForm
            projectInfo={resumeData.projects}
            updateArrayItem={(index, key, value) =>
              updateArrayItem("projects", index, key, value)
            }
            addArrayItem={(newItem) => addArrayItem("projects", newItem)}
            removeArrayItem={(index) => removeArrayItem("projects", index)}
          />
        );

      case "certifications":
        return (
          <CertificationInfoForm
            certifications={resumeData.certifications}
            updateArrayItem={(index, key, value) =>
              updateArrayItem("certifications", index, key, value)
            }
            addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
            removeArrayItem={(index) =>
              removeArrayItem("certifications", index)
            }
          />
        );

      case "additionalInfo":
        return (
          <AdditionalInfoForm
            languages={resumeData.languages}
            interests={resumeData.interests}
            updateArrayItem={(section, index, key, value) =>
              updateArrayItem(section, index, key, value)
            }
            addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
            removeArrayItem={(section, index) =>
              removeArrayItem(section, index)
            }
          />
        );

      default:
        return null;
    }
  };

  // 🔹 State updaters
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleProfileImageChange = (file) => {
  updateSection("profileInfo", "profileImg", file); // File object for upload
  setProfilePreview(URL.createObjectURL(file)); // temporary preview
};


  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      if (key === null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index] = { ...updatedArray[index], [key]: value };
      }
      return { ...prev, [section]: updatedArray };
    });
  };

  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return { ...prev, [section]: updatedArray };
    });
  };

  // 🔹 Fetch resume
  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );
      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;
        setResumeData((prev) => ({
          ...prev,
          ...resumeInfo,
        }));
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  // 🔹 Delete resume
  const handleDeleteResume = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.delete(
        API_PATHS.RESUME.DELETE(resumeId)
      );
      toast.success("Resume deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to delete resume.", err);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadResumeImages = async () => {
    if (!resumeRef.current) {
      toast.error("Resume preview is not ready.");
      return;
    }

    try {
      setIsLoading(true);

      // 🔹 Override CSS variables for safe capture
      const applySafeCaptureTheme = (element) => {
        if (!element) return () => { };

        const root = document.documentElement;

        // Backup original DaisyUI variables
        const originalVars = {};
        for (const varName of [
          "--p", "--pc", "--s", "--sc", "--a", "--ac", "--n", "--b1", "--b2", "--b3"
        ]) {
          originalVars[varName] = getComputedStyle(root).getPropertyValue(varName);
        }

        // Apply safe RGB fallbacks
        root.style.setProperty("--p", "#6366F1");
        root.style.setProperty("--s", "#F43F5E");
        root.style.setProperty("--a", "#F59E0B");
        root.style.setProperty("--n", "#374151");
        root.style.setProperty("--b1", "#FFFFFF");
        root.style.setProperty("--b2", "#F3F4F6");
        root.style.setProperty("--b3", "#E5E7EB");

        // Sanitize inline element colors
        sanitizeColorsForCapture(element);

        return () => {
          // Restore original theme
          for (const varName in originalVars) {
            root.style.setProperty(varName, originalVars[varName]);
          }
        };
      };

      // Apply safe theme for capture
      const restoreTheme = applySafeCaptureTheme(resumeRef.current);

      // Capture the resume preview as an image
      const imageDataUrl = await captureElementAsImage(resumeRef.current);
      restoreTheme(); // restore Winter theme immediately after capture

      // Convert to file
      const thumbnailFile = dataURLtoFile(imageDataUrl, `resume-${resumeId}.png`);
      const profileImageFile = resumeData?.profileInfo?.profileImg || null;

      // Prepare FormData
      const formData = new FormData();
      if (profileImageFile) formData.append("profileImage", profileImageFile);
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

      // Upload images
      let thumbnailLink = "";
      let profilePreviewUrl = "";

      if (formData.has("profileImage") || formData.has("thumbnail")) {
        const uploadResponse = await axiosInstance.put(
          API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        thumbnailLink = uploadResponse.data.thumbnailLink || "";
        profilePreviewUrl = uploadResponse.data.profilePreviewUrl || "";
      }

      // Save resume details
      await updateResumeDetails(thumbnailLink, profilePreviewUrl);

      toast.success("Resume updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error uploading resume:", error.response || error.message);
      toast.error("Failed to save resume. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
  const updatedResumeData = {
    ...resumeData,
    thumbnailLink: thumbnailLink || resumeData.thumbnailLink,
    profileInfo: {
      ...resumeData.profileInfo,
      profileImg: profilePreviewUrl || resumeData.profileInfo.profileImg, 
      profilePreviewUrl: profilePreviewUrl || resumeData.profileInfo.profilePreviewUrl,
    },
  };

  await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId), updatedResumeData);
  setResumeData(updatedResumeData);
  setProfilePreview(profilePreviewUrl); // persist preview
};

  // 🔹 Print / Download
  const reactToPrintFn = useReactToPrint({ contentRef: resumeDownloadRef });

  // 🔹 Adjust base width
  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
  const fetchResume = async () => {
    const res = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));
    const data = res.data;

    // Use the persisted URL
    setResumeData(data);
    setProfilePreview(data.profileInfo.profilePreviewUrl || data.profileInfo.profileImg || "");
  };
  fetchResume();
}, []);

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    fetchResumeDetailsById();
    return () => window.removeEventListener("resize", updateBaseWidth);
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        {/* 🔹 Header */}
        <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-pink-100 py-3 px-4 mb-4">
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prev) => ({ ...prev, title: value }))
            }
          />

          <div className="flex items-center gap-4">
            <button className="btn-small-light" onClick={handleDeleteResume}>
              <LuTrash2 className="text-[16px]" />
              <span className="hidden md:block">Delete</span>
            </button>

            <button
              className="btn-small-light"
              onClick={() => setOpenPreviewModal(true)}
            >
              <LuDownload className="text-[16px]" />
              <span className="hidden md:block">Preview & Download</span>
            </button>
          </div>
        </div>

        {/* 🔹 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left form */}
          <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
            <StepProgress progress={progress} />

            {renderForm()}

            <div className="mx-5">
              {errorMsg && (
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded">
                  <LuCircleAlert className="text-md" /> {errorMsg}
                </div>
              )}

              <div className="flex items-end justify-end gap-3 mt-3 mb-5">
                <button className="btn-small-light" onClick={goBack}>
                  <LuArrowLeft className="text-[16px]" /> Back
                </button>

                <button
                  className="btn-small-light"
                  onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  <LuSave className="text-[16px]" />
                  {isLoading ? "Updating..." : "Save and Exit"}
                </button>

                <button
                  className="btn-small"
                  onClick={validateAndNext}
                  disabled={isLoading}
                >
                  {currentPage === "additionalInfo" ? (
                    <>
                      <LuDownload className="text-[16px]" /> Preview & Download
                    </>
                  ) : (
                    <>
                      Next <LuArrowLeft className="text-[16px] rotate-180" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right preview */}
          <div ref={resumeRef} className="h-[100vh] overflow-auto">
            <RenderResume
              templateId={resumeData?.template?.theme || ""}
              resumeData={resumeData}
              colorPalette={resumeData?.template?.colorPalette || []}
              containerWidth={baseWidth}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title={resumeData.title}
        showActionBtn
        actionBtnText="Download"
        actionBtnIcon={<LuDownload className="text-[16px]" />}
        onActionClick={() => reactToPrintFn()}
      >
        <div ref={resumeDownloadRef} className="w-[98vw] h-[90vh]">
          <RenderResume
            templateId={resumeData?.template?.theme || ""}
            resumeData={resumeData}
            colorPalette={resumeData?.template?.colorPalette || []}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default EditResume;
