const availableStock = require("../modules/availableStock");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const farmer = require("../modules/registerFarmer");

//@desc      Get available Stocks
//@route     GET /api/v1/farmers/:farmerId/availablestock
//@access    Public
exports.getavailableStock = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.farmerId) {
    query = availableStock.find({ farmer: req.params.farmerId }).populate({
      path: "farmer",
      select: "name contactNumber",
    });
  } else {
    query = availableStock.find().populate({
      path: "farmer",
      select: "name contactNumber",
    });
  }
  const Stocks = await query;
  res.status(200).json({
    success: true,
    count: Stocks.length,
    data: Stocks,
  });
});

//@desc      Add available Stocks
//@route     POST /api/v1/farmers/:farmerid/availablestock
//@access    Private
exports.addavailableStock = asyncHandler(async (req, res, next) => {
  req.body.farmer = req.params.farmerId;

  const Farmer = await farmer.findById(req.params.farmerId);

  if (!Farmer) {
    return next(
      new errorResponse(`No Farmer with the id of ${req.params.farmerId}`, 404)
    );
  }
  const Stocks = await availableStock.create(req.body);

  res.status(200).json({
    success: true,
    data: Stocks,
  });
});

//@desc      Get single available Stock
//@route     GET /api/v1/availablestock/:id
//@access    Public
exports.getaAvailableStock = asyncHandler(async (req, res, next) => {
  const Stocks = await availableStock.findById(req.params.id).populate({
    path: "farmer",
    select: "name contactNumber ",
  });

  if (!Stocks) {
    return next(
      new errorResponse(`mills not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: Stocks,
  });
});

//@desc      Update available stock
//@route     put /api/v1/availablestock/:id
//@access    Public
exports.updateAvailableStock = asyncHandler(async (req, res, next) => {
  let Stocks = await availableStock.findById(req.params.id);

  if (!Stocks) {
    return next(
      new errorResponse(`No Farmer with the id of ${req.params.Id}`, 404)
    );
  }
  Stocks = await availableStock.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: Stocks,
  });
});

//@desc      Delete avaible Stock
//@route     Delete /api/v1/avaiblestock/:id
//@access    Public
exports.deleteAvailableStock = asyncHandler(async (req, res, next) => {
  const Stocks = await availableStock.findById(req.params.id);

  if (!Stocks) {
    return next(
      new errorResponse(`No Farmer with the id of ${req.params.Id}`, 404)
    );
  }
  await Stocks.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
