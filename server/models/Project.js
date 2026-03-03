const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    client: {
      name: String,
      company: String,
      country: String,
      consentToPublish: { type: Boolean, default: false },
    },
    category: {
      type: String,
      enum: ["SaaS", "E-commerce", "Consulting", "Agency", "Startup", "Enterprise", "Other"],
    },
    plan: {
      type: String,
      enum: ["launch", "core", "advance", "pinnacle"],
    },
    description: String,
    fullDescription: String,
    tags: [String],
    metrics: [
      {
        label: String,
        value: String,
      },
    ],
    result: String,
    status: {
      type: String,
      enum: ["draft", "review", "live", "archived"],
      default: "draft",
    },
    featured: { type: Boolean, default: false },
    images: [String],
    bookingRef: String,
    year: String,
    duration: String,
  },
  { timestamps: true }
);

projectSchema.index({ status: 1, featured: -1 });
projectSchema.index({ category: 1 });

module.exports = mongoose.model("Project", projectSchema);
