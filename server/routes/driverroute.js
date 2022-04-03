const express = require("express");
const driverauth = require("../middleware/driverauth")
const dealerauth = require("../middleware/dealerauth")
const drivercontroller = require('../controller/drivercontroller.js')
const services = require('../services/render.js');


const route = express.Router();

route.get('/bookedDealers',driverauth,services.bookedDealer);

route.get('/driver/signUp',services.driverSignUp);

route.get('/driver/login',services.driverLogin);

route.get('/AvailableDrivers',services.alldriverList);

// API
// Register a new driver
route.post('/driver/signUp',drivercontroller.registerDriver);

// Login driver
route.post('/driver/login',drivercontroller.loginDriver);

// Get a list of all drivers whose route is same as current login dealer route (Dealer login required)
route.get('/driver',dealerauth,drivercontroller.find);

// Get list of all available drivers and search by city and state (No login required)
route.get('/alldrivers/:location',drivercontroller.searchDriver);

route.get('/alldrivers',drivercontroller.AllDriver);

route.get('/driver/logout',drivercontroller.driverLogout)

route.post('/driver/:id',dealerauth,drivercontroller.postReview)
route.get('/driver/:id',dealerauth,drivercontroller.driverProfile)
// Delete driver
route.delete('/driver/delete',drivercontroller.deleteDriver);

module.exports = route;