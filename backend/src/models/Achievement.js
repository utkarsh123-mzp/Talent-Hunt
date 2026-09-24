import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: [true, "Achievement title is required"],
      trim: true
    },
    description: {
      type: String,
      default: "",
      trim: true
    },
    category: {
      type: String,
      enum: ["Academic", "Coding", "Competition", "Hackathon", "Certification", "Sports", "Other"],
      default: "Academic"
    },
    date: {
      type: Date,
      default: Date.now
    },
    certificateUrl: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

achievementSchema.index({ user: 1, date: -1 });

export default mongoose.model("Achievement", achievementSchema);
