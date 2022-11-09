const mongoose = require("mongoose"); 
const DateOnly = require('mongoose-dateonly')(mongoose);


var userAccount = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    bdate:{
        type: DateOnly,
        required: true
    },

});

var account = mongoose.model("accounts", userAccount);
module.exports =  account;
