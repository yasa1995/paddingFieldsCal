const express = require("express");

const {
  getmillsaAvailableStock,
  getmillsavailableStock,
  updatemillsAvailableStock,
  addmillsaddavailableStock,
  deletemillsAvailableStock,
} = require("../controllers/millsAvailableStocksCont");

const router = express.Router({ mergeParams: true });

router.route("/").get(getmillsavailableStock).post(addmillsaddavailableStock);
router
  .route("/:id")
  .get(getmillsaAvailableStock)
  .put(updatemillsAvailableStock)
  .delete(deletemillsAvailableStock);

module.exports = router;
