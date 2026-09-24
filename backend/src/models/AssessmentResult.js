import mongoose from "mongoose";

const assessmentResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
      index: true
    },
    assessmentTitle: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    correctCount: {
      type: Number,
      default: 0
    },
    wrongCount: {
      type: Number,
      default: 0
    },
    unansweredCount: {
      type: Number,
      default: 0
    },
    answers: [
      {
        questionIndex: Number,
        selectedOption: Number,
        correctOption: Number,
        isCorrect: Boolean
      }
    ],
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Index to query student assessment history efficiently
assessmentResultSchema.index({ user: 1, assessment: 1 });
assessmentResultSchema.index({ user: 1, completedAt: -1 });

export default mongoose.model("AssessmentResult", assessmentResultSchema);
