const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    client: {
      name: { type: String, required: true },
      role: String,
      company: String,
      country: String,
      avatar: String,
    },
    plan: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    quote: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "published", "rejected"],
      default: "pending",
    },
    featured: { type: Boolean, default: false },
    bookingRef: String,
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  },
  { timestamps: true }
);

testimonialSchema.index({ status: 1 });
testimonialSchema.index({ rating: -1 });

module.exports = mongoose.model("Testimonial", testimonialSchema);
