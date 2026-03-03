const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingRef: {
      type: String,
      unique: true,
      default: () => "NX-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    },
    plan: {
      type: String,
      enum: ["launch", "core", "advance", "pinnacle"],
      required: true,
    },
    planName: String,
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    // Client details
    client: {
      firstName: { type: String, required: true },
      lastName: String,
      email: { type: String, required: true, lowercase: true },
      company: String,
      phone: String,
      timezone: { type: String, default: "UTC" },
    },
    // Project requirements
    requirements: {
      projectType: String,
      goals: { type: String, required: true },
      challenges: String,
      budget: String,
      preferredDate: Date,
      preferredTime: String,
    },
    // Payment
    payment: {
      provider: { type: String, default: "stripe" },
      stripeSessionId: String,
      stripePaymentIntentId: String,
      paidAt: Date,
    },
    // Admin notes
    notes: String,
    sessionScheduled: Date,
  },
  { timestamps: true }
);

// Indexes
bookingSchema.index({ "client.email": 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Booking", bookingSchema);
