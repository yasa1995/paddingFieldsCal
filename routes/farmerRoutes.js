const express = require("express");

const {
  getfarmers,
  getfarmer,
  deletefarmer,
  updatefarmer,
  createfarmers,
} = require("../controllers/farmers");

const { protect } = require("../middleware/auth");

//Include Other resource routers
const expectedharvest = require("./expectedHarestRoutes");
const availableStock = require("./availableStockRoutes");

const router = express.Router();

//re_route into other resource routers
router.use("/:farmerId/expectedharvest", expectedharvest);
router.use("/:farmerId/availablestock", availableStock);

router.route("/").get(getfarmers).post(protect, createfarmers);
router
  .route("/:id")
  .get(getfarmer)
  .put(protect, updatefarmer)
  .delete(protect, deletefarmer);

module.exports = router;
