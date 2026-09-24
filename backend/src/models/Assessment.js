import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [
    {
      type: String,
      required: true
    }
  ],
  answer: {
    type: Number,
    required: true // 0-based index
  },
  explanation: {
    type: String,
    default: ""
  },
  skillCategory: {
    type: String,
    default: "General"
  }
});

const assessmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      index: true
    },
    targetAudience: {
      type: String,
      enum: ["school", "college", "all"],
      default: "college",
      index: true
    },
    classLevel: {
      type: String,
      default: ""
    },
    durationMinutes: {
      type: Number,
      default: 20
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    questions: [questionSchema],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Assessment", assessmentSchema);
