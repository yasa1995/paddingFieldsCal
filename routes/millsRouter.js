const express = require("express");
const {
  getmill,
  getmills,
  updatemill,
  deleteMill,
  createmills,
} = require("../controllers/millsDo");

//Include Other resource routers
const millsAvailableStock = require("./millsAvailableStockRoutes");
const routerM = express.Router();
//re_route into other resource routers
routerM.use("/:millsId/millsavailablestock", millsAvailableStock);

routerM.route("/").get(getmills).post(createmills);
routerM.route("/:id").get(getmill).put(updatemill).delete(deleteMill);

module.exports = routerM;
