const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

const PLAN_NAMES = {
  launch: "Launch Plan",
  core: "Core Plan",
  advance: "Advance Plan",
  pinnacle: "Pinnacle Plan",
};

const PLAN_PRICES = { launch: 36, core: 48, advance: 84, pinnacle: 192 };

// POST /api/bookings — Create a new booking
router.post("/", async (req, res) => {
  try {
    const {
      plan, firstName, lastName, email, company, phone, timezone,
      projectType, goals, challenges, budget, preferredDate, preferredTime,
    } = req.body;

    if (!plan || !firstName || !email || !goals) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const price = PLAN_PRICES[plan];
    if (!price) return res.status(400).json({ error: "Invalid plan" });

    const booking = await Booking.create({
      plan,
      planName: PLAN_NAMES[plan],
      price,
      client: { firstName, lastName, email, company, phone, timezone },
      requirements: { projectType, goals, challenges, budget, preferredDate, preferredTime },
    });

    res.status(201).json({
      success: true,
      bookingRef: booking.bookingRef,
      plan: booking.planName,
      price: booking.price,
    });
  } catch (err) {
    console.error("Create booking error:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// GET /api/bookings — List all bookings (admin)
router.get("/", async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();
    const total = await Booking.countDocuments(filter);
    res.json({ bookings, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// GET /api/bookings/:ref — Get booking by ref
router.get("/:ref", async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingRef: req.params.ref }).lean();
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

// PATCH /api/bookings/:ref — Update booking status
router.patch("/:ref", async (req, res) => {
  try {
    const { status, notes, sessionScheduled } = req.body;
    const booking = await Booking.findOneAndUpdate(
      { bookingRef: req.params.ref },
      { $set: { status, notes, sessionScheduled } },
      { new: true }
    );
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to update booking" });
  }
});

module.exports = router;
