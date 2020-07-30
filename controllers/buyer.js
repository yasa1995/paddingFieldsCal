const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const buyer = require("../modules/regBuyers");

//@desc      Get all buyers
//@route     GET /api/v1/buyers/
//@access    Public
exports.getbuyers = asyncHandler(async (req, res, next) => {
  try {
    const buyers = await buyer.find();
    res.status(200).json({
      success: true,
      count: buyers.length,
      data: buyers,
    });
  } catch (err) {
    next(err);
  }
});

//@desc      Get single buyer
//@route     GET /api/v1/buyers/:id
//@access    Public
exports.getbuyer = asyncHandler(async (req, res, next) => {
  try {
    const abuyer = await buyer.findById(req.params.id);

    if (!abuyer) {
      return next(
        new errorResponse(`buyer not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: abuyer,
    });
  } catch (err) {
    //res.status(200).json({ success: false });
    next(err);
  }
});

//@desc      Create new buyer
//@route     POST /api/v1/buyers/
//@access    private
exports.createbuyers = asyncHandler(async (req, res, next) => {
  try {
    const buyers = await buyer.create(req.body);
    res.status(201).json({
      success: true,
      data: buyers,
    });
  } catch (err) {
    next(err);
  }
});

//@desc      UPdate  buyer
//@route     PUT /api/v1/buyers/:id
//@access    private
exports.updatebuyer = asyncHandler(async (req, res, next) => {
  try {
    const buyerUp = await buyer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!buyerUp) {
      return res.status(200).json({ success: false });
    }

    res.status(200).json({ success: true, data: buyerUp });
  } catch (err) {
    next(err);
  }
});

//@desc      Delete  buyer
//@route     DELETE /api/v1/buyers/:id
//@access    private
exports.deletebuyer = asyncHandler(async (req, res, next) => {
  try {
    const buyerdel = await buyer.findByIdAndDelete(req.params.id);
    if (!buyerdel) {
      return res.status(200).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
});
