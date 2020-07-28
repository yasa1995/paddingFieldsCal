const express = require("express");

const {
  getfarmers,
  getfarmer,
  deletefarmer,
  updatefarmer,
  createfarmers,
} = require("../controllers/farmers");

const router = express.Router();
router.route("/").get(getfarmers).post(createfarmers);
router.route("/:id").get(getfarmer).put(updatefarmer).delete(deletefarmer);

module.exports = router;
