import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    originalName: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    filePath: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    parsedText: {
      type: String,
      default: ""
    },
    analysisResult: {
      atsScore: { type: Number, default: 0 },
      keywordsMatch: { type: Number, default: 0 },
      skillsStrength: { type: Number, default: 0 },
      formattingScore: { type: Number, default: 0 },
      status: { type: String, default: "Pending Analysis" },
      detectedSkills: [{ type: String }],
      missingSkills: [{ type: String }],
      recommendedKeywords: [{ type: String }],
      missingSections: [
        {
          title: String,
          message: String
        }
      ],
      sectionAnalysis: {
        contactInfo: { type: Number, default: 0 },
        summary: { type: Number, default: 0 },
        education: { type: Number, default: 0 },
        technicalSkills: { type: Number, default: 0 },
        projects: { type: Number, default: 0 },
        experience: { type: Number, default: 0 }
      },
      suggestedImprovements: [{ type: String }]
    }
  },
  {
    timestamps: true
  }
);

resumeSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Resume", resumeSchema);
