const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "retailer"], default: "retailer" },
  mobile: { type: String, default: "" },
  address: { type: String, default: "" },
  photo: { type: String, default: "" },
  otp: String,
  otpExpires: Date,
});

module.exports = mongoose.model("User", userSchema);
