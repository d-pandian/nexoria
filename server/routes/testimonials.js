const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");

// GET /api/testimonials — Published testimonials
router.get("/", async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = { status: "published" };
    if (featured) filter.featured = true;

    const testimonials = await Testimonial.find(filter)
      .sort({ featured: -1, rating: -1, createdAt: -1 })
      .lean();

    res.json({ testimonials, total: testimonials.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

// POST /api/testimonials — Submit a review
router.post("/", async (req, res) => {
  try {
    const { clientName, role, company, country, plan, rating, quote, bookingRef } = req.body;

    if (!clientName || !rating || !quote) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const testimonial = await Testimonial.create({
      client: { name: clientName, role, company, country },
      plan,
      rating,
      quote,
      bookingRef,
      status: "pending",
    });

    res.status(201).json({ success: true, id: testimonial._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit review" });
  }
});

// PATCH /api/testimonials/:id — Approve/reject (admin)
router.patch("/:id", async (req, res) => {
  try {
    const { status, featured } = req.body;
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: { status, featured } },
      { new: true }
    );
    if (!testimonial) return res.status(404).json({ error: "Not found" });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: "Failed to update testimonial" });
  }
});

module.exports = router;
