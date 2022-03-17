const mongoose = require("mongoose");
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

    number:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },

    material:{
        type:String,
        required:true,
    },

    weight:{
        type:String,
        required:true,
    },

    quantity:{
        type:String,
        required:true,
    },

    city:{
        type:String,
        required:true,
    },

    state:{
        type:String,
        required:true,
    },
    bookedDriverEmail:{
        type:String,
    },

})


// Hash password usign mongoose hook
schema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    let newPassword = this.password.toString();
    this.password = await bcrypt.hash(newPassword,salt);
    next();
})




const Dealerdb = mongoose.model('dealerdb',schema);

module.exports = Dealerdb;