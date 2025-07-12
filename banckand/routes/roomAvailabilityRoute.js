const express = require("express");
const router = express.Router();
const RoomAvailability = require("../models/RoomAvailability");

router.post("/", async (req, res) => {
  try {
    const newEntry = new RoomAvailability(req.body);
    await newEntry.save();
    res.status(201).json({ message: "Room availability saved." });
  } catch (error) {
    console.error("Save error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const rooms = await RoomAvailability.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update entry
router.put("/:id", async (req, res) => {
  try {
    await RoomAvailability.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Room availability updated." });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// Delete entry
router.delete("/:id", async (req, res) => {
  try {
    await RoomAvailability.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete error" });
  }
});

module.exports = router;
