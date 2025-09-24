import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { register, login, getMe, verifyOTP } from "../controllers/authController.js";
import {upload} from "../middleware/uploadMiddleware.js"
import { resendOTP } from "../controllers/otpController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP); 
router.post("/login", login);
router.get("/me", protect, getMe);

router.post("/upload-image", upload.single("image"),(req, res) => {
    if(!req.file) {
        return res.status(400).json({message: "no file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

export default router;