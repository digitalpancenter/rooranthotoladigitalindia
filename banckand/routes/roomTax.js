// routes/roomTax.js
const express = require("express");
const router = express.Router();
const RoomTax = require("../models/RoomTax"); // ✅ make sure path is correct!

// GET route
router.get("/", async (req, res) => {
  try {
    const data = await RoomTax.findOne().sort({ _id: -1 });
    res.json(data || {});
  } catch (err) {
    console.error("GET error:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// POST route
router.post("/", async (req, res) => {
  try {
    const exists = await RoomTax.findOne();
    if (exists) {
      await RoomTax.updateOne({}, req.body);
    } else {
      await RoomTax.create(req.body);
    }
    res.status(200).json({ message: "Saved successfully" });
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ error: "Failed to save data" });
  }
});

module.exports = router;
