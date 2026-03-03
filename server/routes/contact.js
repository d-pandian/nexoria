const express = require("express");
const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, company, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Log (in production: send email via nodemailer)
    console.log("Contact form:", { name, email, company, subject, message });

    // TODO: Add nodemailer integration here
    // const transporter = nodemailer.createTransporter({...});
    // await transporter.sendMail({...});

    res.json({ success: true, message: "Message received. We'll reply within 24h." });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;
