const mongoose = require("mongoose");

const roomRentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fullName: String,
  fullAddress: String,
  mobile: String,
  email: String,
  amount: Number,
  expectedAmount: { type: Number, default: 2000 },
  issueDate: Date,
  payDate: Date,
  extra: Number,
  shortage: Number,
});

module.exports = mongoose.model("RoomRent", roomRentSchema);
