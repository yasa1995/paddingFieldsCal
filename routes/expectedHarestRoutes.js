const express = require("express");

const {
  getexpectHarvest,
  addExpectedHarvest,
  getHarvest,
  updateexpectedHarvest,
} = require("../controllers/expectedharvestFamerCont");

const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });
router.route("/").get(getexpectHarvest).post(protect, addExpectedHarvest);
router.route("/:id").get(getHarvest).put(protect, updateexpectedHarvest);

module.exports = router;
