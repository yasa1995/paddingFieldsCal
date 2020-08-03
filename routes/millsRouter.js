const express = require("express");
const {
  getmill,
  getmills,
  updatemill,
  deleteMill,
  createmills,
} = require("../controllers/millsDo");

const { protect } = require("../middleware/auth");

//Include Other resource routers
const millsAvailableStock = require("./millsAvailableStockRoutes");
const routerM = express.Router();
//re_route into other resource routers
routerM.use("/:millsId/millsavailablestock", millsAvailableStock);

routerM.route("/").get(getmills).post(protect, createmills);
routerM
  .route("/:id")
  .get(getmill)
  .put(protect, updatemill)
  .delete(protect, deleteMill);

module.exports = routerM;
