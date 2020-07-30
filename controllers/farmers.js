const farmer = require("../modules/registerFarmer");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//@desc      Get all farmers
//@route     GET /api/v1/farmers/
//@access    Public
exports.getfarmers = asyncHandler(async (req, res, next) => {
  try {
    const farmers = await farmer.find();
    res.status(200).json({
      success: true,
      count: farmers.length,
      data: farmers,
    });
  } catch (err) {
    next(err);
  }
});

//@desc      Get single farmer
//@route     GET /api/v1/farmers/:id
//@access    Public
exports.getfarmer = asyncHandler(async (req, res, next) => {
  try {
    const aFarmer = await farmer.findById(req.params.id);

    if (!aFarmer) {
      return next(
        new errorResponse(`farmer not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: aFarmer,
    });
  } catch (err) {
    //res.status(200).json({ success: false });
    next(err);
  }
});

//@desc      Create new farmer
//@route     POST /api/v1/farmers/
//@access    private
exports.createfarmers = asyncHandler(async (req, res, next) => {
  try {
    const farmers = await farmer.create(req.body);
    res.status(201).json({
      success: true,
      data: farmers,
    });
  } catch (err) {
    next(err);
  }
});

//@desc      UPdate  farmer
//@route     PUT /api/v1/farmers/:id
//@access    private
exports.updatefarmer = asyncHandler(async (req, res, next) => {
  try {
    const farmerUp = await farmer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!farmerUp) {
      return res.status(200).json({ success: false });
    }

    res.status(200).json({ success: true, data: farmerUp });
  } catch (err) {
    next(err);
  }
});

//@desc      Delete  farmer
//@route     DELETE /api/v1/farmers/:id
//@access    private
exports.deletefarmer = asyncHandler(async (req, res, next) => {
  try {
    const farmerdel = await farmer.findByIdAndDelete(req.params.id);
    if (!farmerdel) {
      return res.status(200).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
});
