const express = require("express");
const router = express.Router();
const RoomRent = require("../models/RoomRent");
const auth = require("../middleware/auth");

// Create new room rent
router.post("/roomrents", auth, async (req, res) => {
  try {
    const {
      fullName,
      fullAddress,
      mobile,
      email,
      amount,
      issueDate,
      payDate,
    } = req.body;

    const FIXED_AMOUNT = 2000;

    const extra = amount > FIXED_AMOUNT ? amount - FIXED_AMOUNT : 0;
    const shortage = amount < FIXED_AMOUNT ? FIXED_AMOUNT - amount : 0;

    const newRent = new RoomRent({
      userId: req.user.id, // user ID from token
      fullName,
      fullAddress,
      mobile,
      email,
      amount,
      issueDate,
      payDate,
      extra,
      shortage,
    });

    await newRent.save();
    res.status(201).json({ message: "Room rent submitted successfully" });
  } catch (error) {
    console.error("Error saving room rent:", error);
    res.status(500).json({ error: "Failed to submit room rent" });
  }
});

// PUT route
router.put("/roomrents/:id", async (req, res) => {
  try {
    const {
      fullName,
      fullAddress,
      mobile,
      email,
      amount,
      issueDate,
      payDate
    } = req.body;

    const FIXED_AMOUNT = 2000;
    const extra = amount > FIXED_AMOUNT ? amount - FIXED_AMOUNT : 0;
    const shortage = amount < FIXED_AMOUNT ? FIXED_AMOUNT - amount : 0;

    await RoomRent.findByIdAndUpdate(req.params.id, {
      fullName,
      fullAddress,
      mobile,
      email,
      amount,
      issueDate,
      payDate,
      extra,
      shortage
    });

    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update" });
  }
});

// DELETE route
router.delete("/roomrents/:id", async (req, res) => {
  try {
    await RoomRent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// Get rents for logged-in user
router.get("/roomrents", auth, async (req, res) => {
  try {
    const rents = await RoomRent.find({ userId: req.user.id });
    res.json(rents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rents" });
  }
});

// Get all room rents (admin view)
router.get("/all-roomrents", async (req, res) => {
  try {
    const rents = await RoomRent.find(); // ✅ get all rents
    res.status(200).json(rents);
  } catch (error) {
    console.error("Error getting all room rents:", error);
    res.status(500).json({ error: "Failed to fetch all room rents" });
  }
});




module.exports = router;
