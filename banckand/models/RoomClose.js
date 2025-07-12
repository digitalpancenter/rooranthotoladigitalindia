const mongoose = require("mongoose");

const roomCloseSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: String,
  amount: {
    type: Number,
    required: true,
  },
  roomCloseDate: {
    type: String, // or Date, depending on front-end format
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("RoomClose", roomCloseSchema);
