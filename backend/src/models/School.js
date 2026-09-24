import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },
    schoolName: {
      type: String,
      required: true,
      trim: true
    },
    schoolType: {
      type: String,
      enum: ["Government", "Private", "International", "Other"],
      default: "Private"
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    website: {
      type: String,
      trim: true,
      default: ""
    },
    contactPerson: {
      type: String,
      trim: true,
      default: ""
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
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("School", schoolSchema);
