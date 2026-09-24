import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },
    applicationId: {
      type: String,
      unique: true,
      sparse: true,
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
      default: ""
    },
    city: {
      type: String,
      trim: true,
      default: ""
    },
    teachingCategory: {
      type: String,
      default: ""
    },
    experience: {
      type: String,
      default: ""
    },
    qualification: {
      type: String,
      default: ""
    },
    subject: {
      type: String,
      default: ""
    },
    subjects: [
      {
        type: String,
        trim: true
      }
    ],
    classLevel: {
      type: String,
      default: ""
    },
    teachingMode: {
      type: String,
      default: "Online"
    },
    specialization: {
      type: String,
      default: ""
    },
    availability: {
      type: String,
      default: "Flexible"
    },
    bio: {
      type: String,
      default: ""
    },
    profileImage: {
      type: String,
      default: ""
    },
    identityType: {
      type: String,
      default: ""
    },
    identityNumber: {
      type: String,
      default: ""
    },
    verificationStatus: {
      type: String,
      enum: ["pending-verification", "verified", "rejected"],
      default: "pending-verification",
      index: true
    },
    currentStage: {
      type: String,
      enum: ["registration", "profile", "documents", "demo", "assessment", "interview", "hiring", "completed"],
      default: "registration"
    },
    classes: [
      {
        title: { type: String, required: true },
        subject: { type: String, default: "" },
        studentCount: { type: Number, default: 0 },
        schedule: { type: String, default: "" },
        status: { type: String, default: "active" }
      }
    ],
    students: [
      {
        name: { type: String, required: true },
        class: { type: String, default: "" },
        subject: { type: String, default: "" },
        joinedAt: { type: Date, default: Date.now }
      }
    ],
    schedule: [
      {
        day: { type: String, required: true },
        time: { type: String, required: true },
        title: { type: String, required: true },
        mode: { type: String, default: "Online" }
      }
    ],
    earnings: {
      total: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
      withdrawn: { type: Number, default: 0 },
      history: [
        {
          month: String,
          amount: Number,
          date: { type: Date, default: Date.now },
          status: { type: String, default: "completed" }
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Teacher", teacherSchema);
