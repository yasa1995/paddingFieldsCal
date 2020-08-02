const mongoose = require("mongoose");

const availableStockSchema = new mongoose.Schema({
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
  farmer: {
    type: mongoose.Schema.ObjectId,
    ref: "registerFarmer",
    required: true,
  },
});

module.exports = mongoose.model("availableStock", availableStockSchema);
