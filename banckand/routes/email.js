const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

router.post(
  "/send-email",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  async (req, res) => {
    const { firstName, lastName, mobile, email, message } = req.body;
    const photoFile = req.files?.photo?.[0];
    const pdfFile = req.files?.pdf?.[0];

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const attachments = [];

      if (photoFile) {
        attachments.push({
          filename: photoFile.originalname,
          path: path.resolve(photoFile.path),
        });
      }

      if (pdfFile) {
        attachments.push({
          filename: pdfFile.originalname,
          path: path.resolve(pdfFile.path),
        });
      }

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Or another recipient
        subject: "New Message from Chat Form",
        html: `<p><b>Name:</b> ${firstName} ${lastName}</p>
               <p><b>Mobile:</b> ${mobile}</p>
               <p><b>Email:</b> ${email}</p>
               <p><b>Message:</b><br/>${message}</p>`,
        attachments,
      };

      await transporter.sendMail(mailOptions);

      // Optional: Clean up uploaded files after sending
      [photoFile, pdfFile].forEach((file) => {
        if (file && file.path) {
          fs.unlink(file.path, (err) => {
            if (err) console.error("Error deleting temp file:", err);
          });
        }
      });

      res.json({ success: true });
    } catch (error) {
      console.error("❌ Error sending email:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = router;
