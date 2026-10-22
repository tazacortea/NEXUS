import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    value: { type: Number, required: true, min: 0, max: 3 },
    label: { type: String, required: true }
  },
  { _id: false }
);

const assessmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    answers: { type: [answerSchema], required: true },
    scores: {
      hydration: { type: Number, required: true, min: 0, max: 100 },
      recovery: { type: Number, required: true, min: 0, max: 100 },
      activity: { type: Number, required: true, min: 0, max: 100 },
      nutrition: { type: Number, required: true, min: 0, max: 100 },
      mindset: { type: Number, required: true, min: 0, max: 100 }
    },
    overallScore: { type: Number, required: true, min: 0, max: 100 },
    insights: [{ type: String }],
    recommendations: [{ type: String }]
  },
  { timestamps: true }
);

export const Assessment = mongoose.model("Assessment", assessmentSchema);
