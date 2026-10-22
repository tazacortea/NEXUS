import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    profile: {
      goal: {
        type: String,
        enum: ["balance", "energy", "consistency"],
        default: "balance"
      }
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
