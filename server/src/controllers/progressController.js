import { ProgressEntry } from "../models/ProgressEntry.js";

function startOfDay(value) {
  const date = value ? new Date(value) : new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function validNumber(value, min, max) {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
}

export async function listProgress(req, res, next) {
  try {
    const entries = await ProgressEntry.find({ user: req.user._id }).sort({ date: -1 }).limit(14);
    res.json({ entries });
  } catch (error) {
    next(error);
  }
}

export async function saveProgress(req, res, next) {
  try {
    const { waterIntake, sleepHours, activeMinutes, mood, date } = req.body;
    if (
      !validNumber(waterIntake, 0, 20) ||
      !validNumber(sleepHours, 0, 24) ||
      !validNumber(activeMinutes, 0, 1440) ||
      !validNumber(mood, 1, 5)
    ) {
      return res.status(400).json({ message: "Please enter realistic values for every check-in field." });
    }

    const entry = await ProgressEntry.findOneAndUpdate(
      { user: req.user._id, date: startOfDay(date) },
      { user: req.user._id, date: startOfDay(date), waterIntake, sleepHours, activeMinutes, mood },
      { new: true, upsert: true, runValidators: true }
    );
    return res.status(201).json({ entry });
  } catch (error) {
    next(error);
  }
}
