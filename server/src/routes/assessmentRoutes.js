import { Router } from "express";
import { createAssessment, getLatestAssessment, getQuestions } from "../controllers/assessmentController.js";
import { requireAuth } from "../middleware/auth.js";

export const assessmentRoutes = Router();
assessmentRoutes.get("/questions", getQuestions);
assessmentRoutes.post("/", requireAuth, createAssessment);
assessmentRoutes.get("/latest", requireAuth, getLatestAssessment);
