const express = require("express");
const {
  getbuyer,
  getbuyers,
  updatebuyer,
  deletebuyer,
  createbuyers,
  login,
} = require("../controllers/buyer");

const router = express.Router();
router.route("/").get(getbuyers);
router.route("/:id").get(getbuyer).delete(deletebuyer).put(updatebuyer);
router.post("/register", createbuyers);
router.post("/login", login);

module.exports = router;
