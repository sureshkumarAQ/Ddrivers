const mongoose = require("mongoose");
const Dealerdb = require('../model/model.js');
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcrypt");


var schema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please enter a valid email']
    },

    password:{
        type:String,
        required:true,
    },

    number:{
        type:String,
        required:true,
    },

    tname:{
        type:String,
        required:true
    },

    tnumber:{
        type:String,
        required:true,
        unique:true
    },

    age:{
        type:String,
    },

    experience:{
        type:String,
    },

    capacity:{
        type:String,
        required:true,
    },

    route:{
        type:String,
        required:true,
    },
    
    dealers:[{
        type:Schema.Types.ObjectId,
        ref:'Dealerdb'
    }]
   
}
);


// Hash password usign mongoose hook
schema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    let newPassword = this.password.toString();
    this.password = await bcrypt.hash(newPassword,salt);
    next();
})



const Driverdb = mongoose.model('driverdb',schema);

module.exports = Driverdb;