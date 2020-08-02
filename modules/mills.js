const mongoose = require("mongoose");

const millsSchema = new mongoose.Schema({
  registrationNumber: {
    type: Number,
    unique: true,
    required: [true, "Please add your registration number"],
    trim: true,
    maxlength: [20, "Name can not be more than 50 Characters"],
  },
  name: {
    type: String,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//cascad delete courses when a farmers is deleted
millsSchema.pre("remove", async function (next) {
  await this.model("millsavailableStock").deleteMany({ mill: this._id });
  next();
});

module.exports = mongoose.model("mills", millsSchema);
