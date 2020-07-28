const mongoose = require("mongoose");

const millsSchema = new mongoose.Schema({
  registrationNumber: {
    type: Number,
    required: [true, "Please add your registration number"],
    trim: true,
    maxlength: [20, "Name can not be more than 50 Characters"],
  },
  name: {
    type: String,
    required: [true, "Please add a Name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 20 Characters"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  contactNumber: {
    type: Number,
  },
  capaticity: {
    type: String,
  },
});

module.exports = mongoose.model("mills", millsSchema);
