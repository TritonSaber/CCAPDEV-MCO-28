const mongoose = require("mongoose"); 
const DateOnly = require('mongoose-dateonly')(mongoose);

var reservation = new mongoose.Schema({
    restaurant: {
        type: String,
        required: true
    },

    name: {
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

    username: {
        type: String,
        required: true
    },

    datein:{
        type: DateOnly,
        required: true
    },

    timein:{
        type: String,
        required: true
    },

    numpeople:{
        type: String,
        required: true
    },

    card:{
        type: String,
        required: true
    },

    cardnum:{
        type: Number,
        required: true
    },

    cvv:{
        type: Number,
        required: true
    },

    monthexp:{
        type: String,
        required: true
    },
    
     resID:{
        type: Number
    }
});

var reserve = mongoose.model("reserves", reservation);

module.exports =  reserve;
