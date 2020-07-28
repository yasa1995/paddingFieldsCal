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
