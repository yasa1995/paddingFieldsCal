const millsavailableStock = require("../modules/millsaAailableStock");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const mills = require("../modules/mills");

//@desc      Get mills available Stocks
//@route     GET /api/v1/mills/:millsId/millsavailablestock
//@access    Public
exports.getmillsavailableStock = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.millsId) {
    query = millsavailableStock.find({ mill: req.params.millsId }).populate({
      path: "mill",
      select: "name registrationNumber",
    });
  } else {
    query = millsavailableStock.find().populate({
      path: "mill",
      select: "name registrationNumber",
    });
  }
  const Stocks = await query;
  res.status(200).json({
    success: true,
    count: Stocks.length,
    data: Stocks,
  });
});

//@desc      Add mills available Stocks
//@route     POST /api/v1/mills/:millsid/millsavailablestock
//@access    Private
exports.addmillsaddavailableStock = asyncHandler(async (req, res, next) => {
  req.body.mill = req.params.millsId;

  const Mills = await mills.findById(req.params.millsId);

  if (!Mills) {
    return next(
      new errorResponse(`No mills with the id of ${req.params.millsId}`, 404)
    );
  }
  const Stocks = await millsavailableStock.create(req.body);

  res.status(200).json({
    success: true,
    data: Stocks,
  });
});

//@desc      Get single mills available Stock
//@route     GET /api/v1/millsavailablestock/:id
//@access    Public
exports.getmillsaAvailableStock = asyncHandler(async (req, res, next) => {
  const Stocks = await millsavailableStock.findById(req.params.id).populate({
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
exports.updatemillsAvailableStock = asyncHandler(async (req, res, next) => {
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
exports.deletemillsAvailableStock = asyncHandler(async (req, res, next) => {
  const Stocks = await availableStock.findById(req.params.id);

  if (!Stocks) {
    return next(
      new errorResponse(`No mills with the id of ${req.params.Id}`, 404)
    );
  }
  await Stocks.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
