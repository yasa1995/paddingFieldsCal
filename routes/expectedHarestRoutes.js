const express = require("express");

const {
  getexpectHarvest,
  addExpectedHarvest,
  getHarvest,
  updateexpectedHarvest,
} = require("../controllers/expectedharvestFamerCont");

const router = express.Router({ mergeParams: true });
router.route("/").get(getexpectHarvest).post(addExpectedHarvest);
router.route("/:id").get(getHarvest).put(updateexpectedHarvest);

module.exports = router;
