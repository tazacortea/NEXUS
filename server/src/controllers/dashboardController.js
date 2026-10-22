import { Assessment } from "../models/Assessment.js";
import { ProgressEntry } from "../models/ProgressEntry.js";

function average(entries, property) {
  if (!entries.length) return 0;
  return Math.round((entries.reduce((sum, entry) => sum + entry[property], 0) / entries.length) * 10) / 10;
}

export async function getDashboard(req, res, next) {
  try {
    const [latestAssessment, entries] = await Promise.all([
      Assessment.findOne({ user: req.user._id }).sort({ createdAt: -1 }),
      ProgressEntry.find({ user: req.user._id }).sort({ date: -1 }).limit(7)
    ]);

    res.json({
      latestAssessment,
      entries,
      summary: {
        checkInsThisWeek: entries.length,
        averageWater: average(entries, "waterIntake"),
        averageSleep: average(entries, "sleepHours"),
        averageMovement: average(entries, "activeMinutes"),
        nextAction: latestAssessment?.recommendations?.[0] || "Complete your first assessment to receive a personalized next action."
      }
    });
  } catch (error) {
    next(error);
  }
}
