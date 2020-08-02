const mongoose = require("mongoose");

const expectedharvestFarmerSchema = new mongoose.Schema({
  season: {
    type: [String],
    required: [true, "Please add the season"],
    enum: ["Yala", "Maha"],
  },
  expectedHarvest: {
    type: Number,
    required: [true, "Please add the Expected Harvest"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  farmer: {
    type: mongoose.Schema.ObjectId,
    ref: "registerFarmer",
    required: true,
  },
});

module.exports = mongoose.model(
  "expectedharvestFarmer",
  expectedharvestFarmerSchema
);
