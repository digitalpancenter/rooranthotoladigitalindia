const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// ✅ Send OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("🔔 /send-otp HIT", email);
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 2 * 60 * 1000;

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for Password Reset",
      html: `<p>Your OTP is <strong>${otp}</strong>. Valid for 2 minutes.</p>`,
    });

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("❌ Error sending OTP:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// ✅ Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    if (Date.now() > user.otpExpires) {
      return res.status(400).json({ error: "OTP expired" });
    }
    res.json({ message: "OTP verified" });
  } catch (err) {
    res.status(500).json({ error: "Error verifying OTP" });
  }
});

// ✅ Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to reset password" });
  }
});

module.exports = router;
