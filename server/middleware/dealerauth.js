const jwt = require("jsonwebtoken");
var Dealerdb = require('../model/model');
const cookieParser = require('cookie-parser');

const config = process.env;

const verifyToken = async(req, res, next) => {
  const token = req.cookies.jwtoken || req.headers.jwtoken;

  if (!token) {
    return res.status(401).send("Login required");
  } 
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    const dealer = await Dealerdb.findById(decoded.id);
    if (!dealer) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.dealer = dealer;
    // console.log(req.dealer._id);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;

