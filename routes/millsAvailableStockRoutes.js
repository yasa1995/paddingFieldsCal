const express = require("express");

const {
  getmillsaAvailableStock,
  getmillsavailableStock,
  updatemillsAvailableStock,
  addmillsaddavailableStock,
  deletemillsAvailableStock,
} = require("../controllers/millsAvailableStocksCont");

const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getmillsavailableStock)
  .post(protect, addmillsaddavailableStock);
router
  .route("/:id")
  .get(getmillsaAvailableStock)
  .put(protect, updatemillsAvailableStock)
  .delete(protect, deletemillsAvailableStock);

module.exports = router;
