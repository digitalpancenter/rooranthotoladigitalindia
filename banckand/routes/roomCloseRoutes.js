const express = require("express");
const router = express.Router();
const RoomClose = require("../models/RoomClose");

// ✅ POST - Create new record
router.post("/", async (req, res) => {
  try {
    const data = new RoomClose(req.body);
    const saved = await data.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to create room close record" });
  }
});

// ✅ GET - All records
router.get("/", async (req, res) => {
  try {
    const records = await RoomClose.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
});

// ✅ PUT - Update record by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await RoomClose.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update record" });
  }
});

// ✅ DELETE - Remove by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await RoomClose.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete record" });
  }
});

module.exports = router;
