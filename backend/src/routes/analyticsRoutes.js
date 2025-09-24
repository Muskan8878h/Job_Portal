import express from "express";
import { getEmployerAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/overview", protect, getEmployerAnalytics);

export default router;