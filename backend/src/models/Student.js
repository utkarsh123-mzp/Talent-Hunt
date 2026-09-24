import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true,
      default: ""
    },
    dateOfBirth: {
      type: String,
      default: ""
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: ""
    },
    studentType: {
      type: String,
      enum: ["school", "college"],
      default: "college"
    },
    institution: {
      type: String,
      trim: true,
      default: ""
    },
    course: {
      type: String,
      trim: true,
      default: ""
    },
    branch: {
      type: String,
      trim: true,
      default: ""
    },
    year: {
      type: String,
      trim: true,
      default: ""
    },
    class: {
      type: String,
      trim: true,
      default: ""
    },
    cgpa: {
      type: String,
      trim: true,
      default: ""
    },
    parentName: {
      type: String,
      trim: true,
      default: ""
    },
    city: {
      type: String,
      trim: true,
      default: ""
    },
    country: {
      type: String,
      trim: true,
      default: "India"
    },
    bio: {
      type: String,
      trim: true,
      default: ""
    },
    profileImage: {
      type: String,
      default: ""
    },
    resume: {
      type: String,
      default: ""
    },
    skills: [
      {
        type: String,
        trim: true
      }
    ],
    achievements: [
      {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        category: { type: String, default: "General" },
        date: { type: Date, default: Date.now }
      }
    ],
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        link: { type: String, default: "" }
      }
    ],
    talentScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    placementReadiness: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    targetRole: {
      type: String,
      trim: true,
      default: "software-developer"
    },
    workPreference: {
      type: String,
      trim: true,
      default: "Remote"
    },
    careerGoal: {
      type: String,
      trim: true,
      default: ""
    },
    github: {
      type: String,
      trim: true,
      default: ""
    },
    linkedin: {
      type: String,
      trim: true,
      default: ""
    },
    portfolio: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Student", studentSchema);
