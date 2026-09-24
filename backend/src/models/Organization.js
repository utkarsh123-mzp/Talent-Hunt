import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },
    organizationName: {
      type: String,
      required: true,
      trim: true
    },
    organizationType: {
      type: String,
      required: true,
      default: "Educational Institution"
    },
    website: {
      type: String,
      trim: true,
      default: ""
    },
    eventInterest: {
      type: String,
      default: "Coding Competitions"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Organization", organizationSchema);
