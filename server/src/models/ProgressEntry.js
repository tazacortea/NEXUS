import mongoose from "mongoose";

const progressEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    date: { type: Date, required: true },
    waterIntake: { type: Number, required: true, min: 0, max: 20 },
    sleepHours: { type: Number, required: true, min: 0, max: 24 },
    activeMinutes: { type: Number, required: true, min: 0, max: 1440 },
    mood: { type: Number, required: true, min: 1, max: 5 }
  },
  { timestamps: true }
);

progressEntrySchema.index({ user: 1, date: 1 }, { unique: true });

export const ProgressEntry = mongoose.model("ProgressEntry", progressEntrySchema);
