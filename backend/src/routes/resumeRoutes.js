import express from "express";
import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadResumeImages } from "../controllers/uploadImages.js";

const router = express.Router();

// Resume routes
router.post("/", protect, createResume); // Create Resume
router.get("/", protect, getUserResumes); // Get all resumes of user
router.get("/:id", protect, getResumeById); // Get resume by ID
router.put("/:id/upload-images", protect, uploadResumeImages); // Upload resume images
router.put("/:id", protect, updateResume); // Update resume
router.delete("/:id", protect, deleteResume); // Delete resume

export default router;