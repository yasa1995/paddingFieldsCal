const mongoose = require("mongoose");

const RegisterFarmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 Characters"],
  },
  nicNo: {
    type: String,
    required: [true, "Please add a ID"],
    unique: true,
    trim: true,
    maxlength: [20, "Name can not be more than 20 Characters"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  contactNumber: {
    type: Number,
  },
  cultivatedArea: {
    type: String,
  },
});

module.exports = mongoose.model("registerFarmer", RegisterFarmerSchema);
