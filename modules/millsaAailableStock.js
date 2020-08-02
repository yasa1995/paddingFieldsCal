const mongoose = require("mongoose");

const millsAvailableStockSchema = new mongoose.Schema({
  paddyType: {
    type: [String],
    required: [true, "Please add the Paddy Type"],
  },
  availableStock: {
    type: Number,
    required: [true, "Please add the Available Stock"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  mill: {
    type: mongoose.Schema.ObjectId,
    ref: "mills",
    required: true,
  },
});

module.exports = mongoose.model(
  "millsavailableStock",
  millsAvailableStockSchema
);
