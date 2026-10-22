import { Router } from "express";
import { listProgress, saveProgress } from "../controllers/progressController.js";
import { requireAuth } from "../middleware/auth.js";

export const progressRoutes = Router();
progressRoutes.get("/", requireAuth, listProgress);
progressRoutes.post("/", requireAuth, saveProgress);
