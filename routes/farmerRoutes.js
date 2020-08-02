const express = require("express");

const {
  getfarmers,
  getfarmer,
  deletefarmer,
  updatefarmer,
  createfarmers,
} = require("../controllers/farmers");

//Include Other resource routers
const expectedharvest = require("./expectedHarestRoutes");
const availableStock = require("./availableStockRoutes");

const router = express.Router();

//re_route into other resource routers
router.use("/:farmerId/expectedharvest", expectedharvest);
router.use("/:farmerId/availablestock", availableStock);

router.route("/").get(getfarmers).post(createfarmers);
router.route("/:id").get(getfarmer).put(updatefarmer).delete(deletefarmer);

module.exports = router;
