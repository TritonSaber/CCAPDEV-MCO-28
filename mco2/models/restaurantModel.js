const mongoose = require("mongoose");

var restaurant = new mongoose.Schema({

    restaurantname: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    restaurantID: {
        type: Number,
    },



});

var restaurants = mongoose.model("restaurants", restaurant);
module.exports =  restaurants;