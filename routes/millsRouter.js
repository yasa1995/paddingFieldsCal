const express = require("express");
const {
  getmill,
  getmills,
  updatemill,
  deleteMill,
  createmills,
} = require("../controllers/millsDo");

const routerM = express.Router();
routerM.route("/").get(getmills).post(createmills);
routerM.route("/:id").get(getmill).put(updatemill).delete(deleteMill);

module.exports = routerM;
