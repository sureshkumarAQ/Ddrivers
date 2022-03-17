const jwt = require("jsonwebtoken");
var Driverdb = require('../model/drivermodel');
const cookieParser = require('cookie-parser');

const config = process.env;

const verifyToken = async(req, res, next) => {
  const token = req.cookies.jwtoken||req.headers.jwtoken;

  if (!token) {
    return res.status(401).send("Login required");
  } 
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    const driver = await Driverdb.findById(decoded.id);
    if (!driver) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.driver = driver;


  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;

