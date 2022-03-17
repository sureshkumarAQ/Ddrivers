const axios = require("axios");

const config = process.env;

exports.homeRoute = (req,res)=>{
    res.render('index.ejs');
}

const authAxios = {
    Headers:{
        Cookie:` jwtoken=${config.JWT_SECRET}`,
    },
};

exports.driverList = (req,res)=>{

    // Make a get request to driver 
    axios.get('http://localhost:3000/driver')
    .then(function(response){
        // console.log(response.data);
        res.render('drivers.ejs',{drivers:response.data})
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.bookedDealer = (req,res)=>{
    // Make a get request to dealer 
    axios.get('http://localhost:3000/dealer',
    
    authAxios)
    .then(function(response){
        // console.log(response.data);
        res.render('bookedDealer.ejs',{dealers:response.data})
    })
    .catch(err=>{
        res.send(err);
    })
    // res.render('bookedDealer.ejs')
}

exports.driverSignUp = (req,res)=>{
    res.render('driverSignUp.ejs');
}

exports.dealerSignUp = (req,res)=>{
    res.render('dealerSignUp.ejs');
}

exports.dealerLogin = (req,res)=>{
    res.render('dealerlogin.ejs');
}

exports.driverLogin = (req,res)=>{
    res.render('driverlogin.ejs');
}