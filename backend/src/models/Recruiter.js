import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    jobRole: {
      type: String,
      required: true,
      trim: true
    },
    companyWebsite: {
      type: String,
      trim: true,
      default: ""
    },
    industry: {
      type: String,
      required: true,
      default: "Information Technology"
    },
    contactInformation: {
      name: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Recruiter", recruiterSchema);
