const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Project = require("../models/Project");
const Testimonial = require("../models/Testimonial");

// GET /api/admin/metrics — Dashboard overview
router.get("/metrics", async (req, res) => {
  try {
    const [
      totalBookings,
      confirmedBookings,
      completedBookings,
      pendingBookings,
      totalProjects,
      liveProjects,
      totalTestimonials,
      pendingTestimonials,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "confirmed" }),
      Booking.countDocuments({ status: "completed" }),
      Booking.countDocuments({ status: "pending" }),
      Project.countDocuments(),
      Project.countDocuments({ status: "live" }),
      Testimonial.countDocuments(),
      Testimonial.countDocuments({ status: "pending" }),
    ]);

    // Revenue calculation
    const revenueResult = await Booking.aggregate([
      { $match: { status: { $in: ["confirmed", "completed"] } } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Monthly revenue (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
          status: { $in: ["confirmed", "completed"] },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$price" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Plan distribution
    const planDistribution = await Booking.aggregate([
      { $group: { _id: "$plan", count: { $sum: 1 }, revenue: { $sum: "$price" } } },
      { $sort: { count: -1 } },
    ]);

    // Average rating
    const ratingResult = await Testimonial.aggregate([
      { $match: { status: "published" } },
      { $group: { _id: null, avg: { $avg: "$rating" } } },
    ]);
    const avgRating = ratingResult[0]?.avg?.toFixed(2) || "5.00";

    res.json({
      bookings: {
        total: totalBookings,
        confirmed: confirmedBookings,
        completed: completedBookings,
        pending: pendingBookings,
      },
      revenue: {
        total: totalRevenue,
        monthly: monthlyRevenue,
        planDistribution,
      },
      projects: {
        total: totalProjects,
        live: liveProjects,
      },
      testimonials: {
        total: totalTestimonials,
        pending: pendingTestimonials,
        avgRating,
      },
    });
  } catch (err) {
    console.error("Admin metrics error:", err);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});

// GET /api/admin/recent — Recent activity
router.get("/recent", async (req, res) => {
  try {
    const [recentBookings, recentFeedback] = await Promise.all([
      Booking.find().sort({ createdAt: -1 }).limit(10).lean(),
      Testimonial.find({ status: "pending" }).sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    res.json({ recentBookings, recentFeedback });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recent activity" });
  }
});

module.exports = router;
