const expectedHarvest = require("../modules/expectedHarvestFarmer");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const farmer = require("../modules/registerFarmer");

//@desc      Get Expected harvest
//@route     GET /api/v1/farmers/:farmerId/expecedHarvest
//@access    Public
exports.getexpectHarvest = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.farmerId) {
    query = expectedHarvest.find({ farmer: req.params.farmerId }).populate({
      path: "farmer",
      select: "name",
    });
  } else {
    query = expectedHarvest.find().populate({
      path: "farmer",
      select: "name",
    });
  }
  const harvest = await query;
  res.status(200).json({
    success: true,
    count: harvest.length,
    data: harvest,
  });
});

//@desc      Add Expected harest
//@route     POST /api/v1/farmers/:farmerid/expectedHarest
//@access    Private
exports.addExpectedHarvest = asyncHandler(async (req, res, next) => {
  req.body.farmer = req.params.farmerId;

  const Farmer = await farmer.findById(req.params.farmerId);

  if (!Farmer) {
    return next(
      new errorResponse(`No Farmer with the id of ${req.params.farmerId}`, 404)
    );
  }
  const harvest = await expectedHarvest.create(req.body);

  res.status(200).json({
    success: true,
    data: harvest,
  });
});

//@desc      Get single Expected Harvest
//@route     GET /api/v1/expectedHarvest/:id
//@access    Public
exports.getHarvest = asyncHandler(async (req, res, next) => {
  const harvest = await expectedHarvest.findById(req.params.id).populate({
    path: "farmer",
    select: "name ",
  });

  if (!harvest) {
    return next(
      new errorResponse(`hearvest not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: harvest,
  });
});

//@desc      Update  expected Harvest
//@route     put /api/v1/expectedHarvest/:id
//@access    Public
exports.updateexpectedHarvest = asyncHandler(async (req, res, next) => {
  let harvest = await expectedHarvest.findById(req.params.id);

  if (!harvest) {
    return next(
      new errorResponse(`No Farmer with the id of ${req.params.Id}`, 404)
    );
  }
  harvest = await expectedHarvest.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: harvest,
  });
});

//@desc      Delete Expected harvest
//@route     Delete /api/v1/expectedharvest/:id
//@access    Public
exports.deleteexpectedHarvest = asyncHandler(async (req, res, next) => {
  const harvest = await expectedHarvest.findById(req.params.id);

  if (!harvest) {
    return next(
      new errorResponse(`No Farmer with the id of ${req.params.Id}`, 404)
    );
  }
  await harvest.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
