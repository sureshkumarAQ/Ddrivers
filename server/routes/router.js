const express = require("express");
const dealerauth = require("../middleware/dealerauth")
const driverauth = require("../middleware/driverauth")
const controller = require('../controller/controller.js')
const services = require('../services/render.js');




const route = express.Router();

//Services
route.get('/',services.homeRoute);
route.get('/dealer/signUp',services.dealerSignUp);
route.get('/dealer/login',services.dealerLogin);
route.get('/drivers', dealerauth,services.driverList);




//APIs

// Register a new dealer
route.post('/dealer/signUp',controller.registerDealer);

// Login dealer
route.post('/dealer/login',controller.loginDealer);

// Get a list of dealer who booked current login driver service (Driver Login required)
route.get('/dealer',driverauth,controller.find);

// Book a new driver (Dealer Login required)
route.post('/dealer/book',dealerauth,controller.bookDriver);

route.get('/dealer/logout',controller.dealerLogout)

// Delete Dealer
route.delete('/dealer/delete',controller.deleteDealer);


module.exports = route;