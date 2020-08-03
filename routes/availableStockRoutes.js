const express = require("express");

const {
  getavailableStock,
  getaAvailableStock,
  addavailableStock,
  updateAvailableStock,
  deleteAvailableStock,
} = require("../controllers/availableStockCont");

const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });
router.route("/").get(getavailableStock).post(protect, addavailableStock);
router
  .route("/:id")
  .get(getaAvailableStock)
  .put(protect, updateAvailableStock)
  .delete(protect, deleteAvailableStock);

module.exports = router;
