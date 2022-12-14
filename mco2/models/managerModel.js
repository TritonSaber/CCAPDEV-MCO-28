const mongoose = require("mongoose");

var userManager = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    restaurant: {
        type: String,
        default: null
    },

    restaurantID: {
        type: Number
    },

});

var manager = mongoose.model("managers", userManager);
module.exports =  manager;