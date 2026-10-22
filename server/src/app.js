import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { authRoutes } from "./routes/authRoutes.js";
import { assessmentRoutes } from "./routes/assessmentRoutes.js";
import { dashboardRoutes } from "./routes/dashboardRoutes.js";
import { progressRoutes } from "./routes/progressRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

export const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "100kb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ status: "ok", service: "NEXUS API" }));
app.use("/api/auth", authRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(notFound);
app.use(errorHandler);
