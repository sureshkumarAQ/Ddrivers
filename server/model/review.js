const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcrypt");
var Driverdb = require('../model/drivermodel');
var Dealerdb = require('../model/model');

var schema = new mongoose.Schema({

    text:{
        type:String
    },

    postedBy: { type: Schema.Types.ObjectId, ref: 'dealerdb' },
    postedFor:{type: Schema.Types.ObjectId, ref: 'driverdb'},
    // timestamps: true
}
);

const Review = mongoose.model('review',schema);

module.exports = Review;