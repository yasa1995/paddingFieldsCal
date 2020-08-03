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
  const { name, email, password } = req.body;
  //Create user
  const user = await buyer.create({ name, email, password });

  sendTokenResponse(user, 200, res);
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

//Get token from model ,create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

//@desc      Login User
//@route     POST /api/v1/auth/login
//@access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate Email and password
  if (!email || !password) {
    return next(new errorResponse("Please provide an email and password", 400));
  }

  //Check for user
  const user = await buyer.findOne({ email }).select("+password");

  if (!user) {
    return next(new errorResponse("Please provide an email and password", 401));
  }

  //check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new errorResponse("Please provide an email and password", 401));
  }

  sendTokenResponse(user, 200, res);
});
