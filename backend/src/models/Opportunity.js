import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Opportunity title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    organization: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: [
        "Internship",
        "Job",
        "Scholarship",
        "Competition",
        "Hackathon",
        "Workshop",
        "Event",
        "fulltime",
        "parttime",
        "internship",
        "hackathon",
        "competition"
      ],
      required: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      index: true
    },
    location: {
      type: String,
      default: "Remote"
    },
    mode: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site", "Work From Home", "One-to-One", "Online", "In-Person"],
      default: "Remote"
    },
    audience: {
      type: String,
      enum: ["school", "college", "teacher", "all"],
      default: "college",
      index: true
    },
    deadline: {
      type: Date,
      required: true,
      index: true
    },
    stipend: {
      type: String,
      default: ""
    },
    fee: {
      type: String,
      default: ""
    },
    skills: [
      {
        type: String,
        trim: true
      }
    ],
    eligibility: {
      type: String,
      default: "Open to eligible students/educators"
    },
    link: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: "ph-briefcase"
    },
    recommended: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "active",
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Compound index for search and filtering
opportunitySchema.index({ type: 1, category: 1, status: 1 });
opportunitySchema.index({ title: "text", description: "text", organization: "text" });

export default mongoose.model("Opportunity", opportunitySchema);
