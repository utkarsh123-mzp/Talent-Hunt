import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: true,
      index: true
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student"
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "interview", "selected", "rejected", "withdrawn"],
      default: "applied",
      index: true
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume"
    },
    notes: {
      type: String,
      default: ""
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate applications by same user for same opportunity
applicationSchema.index({ user: 1, opportunity: 1 }, { unique: true });

export default mongoose.model("Application", applicationSchema);
