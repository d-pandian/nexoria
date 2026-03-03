require("dotenv").config({ path: "../.env.local" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookingRoutes = require("./routes/bookings");
const projectRoutes = require("./routes/projects");
const testimonialRoutes = require("./routes/testimonials");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.SERVER_PORT || 5001;

// ── Middleware ─────────────────────────────
app.use(cors({ origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ──────────────────────────
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Nexoria API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ── Routes ────────────────────────────────
app.use("/api/bookings", bookingRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// ── Error handler ─────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

// ── 404 handler ──────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── MongoDB + Server start ────────────────
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nexoria";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB:", MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Nexoria server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    console.log("⚡ Starting server without DB (limited functionality)...");
    app.listen(PORT, () => {
      console.log(`🚀 Nexoria server running on http://localhost:${PORT} (no DB)`);
    });
  });

module.exports = app;
