const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    ownerName: String,
    textMessage: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoomAvailability", RoomSchema);
