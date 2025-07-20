const express = require("express");
const router = express.Router();
const multer = require("multer");
const nodemailer = require("nodemailer");
const fs = require("fs");

// Use multer for file upload
const upload = multer({ dest: "uploads/" });

router.post("/send-email", upload.fields([{ name: "photo" }, { name: "pdf" }]), async (req, res) => {
  const { firstName, lastName, mobile, message, toEmail } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const attachments = [];

    if (req.files.photo) {
      attachments.push({
        filename: req.files.photo[0].originalname,
        path: req.files.photo[0].path,
      });
    }

    if (req.files.pdf) {
      attachments.push({
        filename: req.files.pdf[0].originalname,
        path: req.files.pdf[0].path,
      });
    }

    const mailOptions = {
      from: `"RA Digital India" <${process.env.EMAIL_USER}>`,
      to: toEmail, // ✅ dynamic recipient
      subject: "Message from RA Digital India",
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    // delete uploaded files
    attachments.forEach(file => fs.unlink(file.path, () => {}));

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error sending email:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
