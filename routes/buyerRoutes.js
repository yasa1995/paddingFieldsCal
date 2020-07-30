const express = require("express");
const {
  getbuyer,
  getbuyers,
  updatebuyer,
  deletebuyer,
  createbuyers,
} = require("../controllers/buyer");

const router = express.Router();
router.route("/").get(getbuyers).post(createbuyers);
router.route("/:id").get(getbuyer).delete(deletebuyer).put(updatebuyer);

module.exports = router;
