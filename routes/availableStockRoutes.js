const express = require("express");

const {
  getavailableStock,
  getaAvailableStock,
  addavailableStock,
  updateAvailableStock,
  deleteAvailableStock,
} = require("../controllers/availableStockCont");

const router = express.Router({ mergeParams: true });
router.route("/").get(getavailableStock).post(addavailableStock);
router
  .route("/:id")
  .get(getaAvailableStock)
  .put(updateAvailableStock)
  .delete(deleteAvailableStock);

module.exports = router;
