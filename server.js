const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const logger = require("./middleware/logger");
const connectDB = require("./config/db");
//load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

//Route Files
const registerFarmer = require("./routes/farmerRoutes");
const registermills = require("./routes/millsRouter");
const registerBuyers = require("./routes/buyerRoutes");
const expectedHearvestFarmer = require("./routes/expectedHarestRoutes");
const availableStock = require("./routes/availableStockRoutes");
const millsavailableStock = require("./routes/millsAvailableStockRoutes");

const app = express();

//Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(logger);

//Mount routers
app.use("/api/v1/farmers", registerFarmer);
app.use("/api/v1/mills", registermills);
app.use("/api/v1/buyers", registerBuyers);
app.use("/api/v1/expectedharvest", expectedHearvestFarmer);
app.use("/api/v1/availablestock", availableStock);
app.use("/api/v1/millsavailablestock", millsavailableStock);

app.use(errorHandler);

const PORT = process.env.PORT || 6000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`ERROR:${err.message}`);

  //Close server & exit process
  server.close(() => process.exit(1));
});
