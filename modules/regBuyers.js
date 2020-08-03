const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const buyersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a Name"],
    trim: true,
    maxlength: [50, "Name can not be more than 20 Characters"],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExprire: Date,
  nicNo: {
    type: String,
  },
  shopName: {
    type: String,
  },
  contactNo: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//Encrpyt password using bcrypt
buyersSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Sign JWT and return
buyersSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Match user entered password to hashed password in database
buyersSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("registerBuyer", buyersSchema);
