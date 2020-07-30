const mongoose = require("mongoose");

const buyersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a Name"],
    trim: true,
    maxlength: [50, "Name can not be more than 20 Characters"],
  },
  NIC: {
    type: String,
    required: [true, "Please add your NIC"],
    trim: true,
    unique: true,
    maxlength: [20, "Name can not be more than 50 Characters"],
  },
  shopName: {
    type: String,
    required: [true, "Please add an shop Name"],
  },
  contactNo: {
    type: Number,
    required: [true, "Please add an contact Number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("registerBuyer", buyersSchema);
