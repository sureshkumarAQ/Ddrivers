const express = require("express");
const dealerauth = require("../middleware/dealerauth")
const driverauth = require("../middleware/driverauth")
const controller = require('../controller/controller.js')
const services = require('../services/render.js');




const route = express.Router();

route.get('/',services.homeRoute);


route.get('/dealer/signUp',services.dealerSignUp);



route.get('/dealer/login',services.dealerLogin);
route.get('/drivers', dealerauth,services.driverList);



route.get('/dealer/logout',controller.dealerLogout)
// Register a new dealer
route.post('/dealer/signUp',controller.registerDealer);

// Login dealer
route.post('/dealer/login',controller.loginDealer);

route.get('/dealer',driverauth,controller.find);

route.post('/dealer/book',dealerauth,controller.bookDriver);

// Delete Dealer
route.delete('/dealer/delete',controller.deleteDealer);


//API
// route.post('/api/dealers',controller.create);

module.exports = route;