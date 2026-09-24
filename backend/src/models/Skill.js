import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    score: {
      type: Number,
      default: 50,
      min: 0,
      max: 100
    },
    category: {
      type: String,
      default: "Technical"
    },
    verified: {
      type: Boolean,
      default: false
    },
    lastAssessedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

skillSchema.index({ user: 1, name: 1 }, { unique: true });

export default mongoose.model("Skill", skillSchema);
