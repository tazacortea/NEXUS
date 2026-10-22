import { assessmentQuestions } from "../constants/assessmentQuestions.js";
import { Assessment } from "../models/Assessment.js";
import { calculateWellnessResult } from "../services/wellnessEngine.js";

export function getQuestions(req, res) {
  res.json({ questions: assessmentQuestions });
}

export async function createAssessment(req, res, next) {
  try {
    if (!Array.isArray(req.body.answers)) return res.status(400).json({ message: "Assessment answers must be provided." });
    const result = calculateWellnessResult(req.body.answers);
    const assessment = await Assessment.create({ user: req.user._id, ...result });
    return res.status(201).json({ assessment });
  } catch (error) {
    if (error.message.startsWith("Please answer")) return res.status(400).json({ message: error.message });
    next(error);
  }
}

export async function getLatestAssessment(req, res, next) {
  try {
    const assessment = await Assessment.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json({ assessment });
  } catch (error) {
    next(error);
  }
}
