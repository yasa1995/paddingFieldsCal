const mill = require("../modules/mills");
const errorResponse = require("../utils/errorResponse");

//@desc      Get all mills
//@route     GET /api/v1/mills/
//@access    Public
exports.getmills = async (req, res, next) => {
  try {
    const mills = await mill.find();
    res.status(200).json({
      success: true,
      count: mills.length,
      data: mills,
    });
  } catch (err) {
    next(err);
  }
};

//@desc      Get single mill
//@route     GET /api/v1/mills/:id
//@access    Public
exports.getmill = async (req, res, next) => {
  try {
    const aMill = await mill.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new errorResponse(`farmer not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: aMill,
    });
  } catch (err) {
    //res.status(200).json({ success: false });
    next(err);
  }
};

//@desc      Create new farmer
//@route     POST /api/v1/mills/
//@access    private
exports.createmills = async (req, res, next) => {
  try {
    const mills = await mill.create(req.body);
    res.status(201).json({
      success: true,
      data: mills,
    });
  } catch (err) {
    next(err);
  }
};

//@desc      UPdate  farmer
//@route     PUT /api/v1/mills/:id
//@access    private
exports.updatemill = async (req, res, next) => {
  try {
    const aMillUp = await mill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!aMillUp) {
      return res.status(200).json({ success: false });
    }

    res.status(200).json({ success: true, data: aMillUp });
  } catch (err) {
    next(err);
  }
};

//@desc      Delete  Mill
//@route     DELETE /api/v1/mills/:id
//@access    private
exports.deleteMill = async (req, res, next) => {
  try {
    const millDel = await mill.findByIdAndDelete(req.params.id);
    if (!millDel) {
      return res.status(200).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
