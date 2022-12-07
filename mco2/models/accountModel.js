const mongoose = require("mongoose"); 
const DateOnly = require('mongoose-dateonly')(mongoose);
const passportLocalMongoose = require("passport-local-mongoose");


const userAccount = new mongoose.Schema({
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


    name: {
        type: String,
        required: true
    },

    bdate:{
        type: DateOnly,
        required: true
    },
    
    role: {
        type: String,
        default: "User",
    },

    image: {
        type: String,
        default: "userdefault.jpg"
    }

});

userAccount.plugin(passportLocalMongoose);

const account = mongoose.model("accounts", userAccount);
module.exports = account;
