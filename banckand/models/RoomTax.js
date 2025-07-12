// models/RoomTax.js
const mongoose = require("mongoose");

const RoomTaxSchema = new mongoose.Schema({
  tax1: String,
  tax2: String,
  contactNumber: String,
  customNote: String,
});

module.exports = mongoose.model("RoomTax", RoomTaxSchema);
