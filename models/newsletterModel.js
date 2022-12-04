const mongoose = require("mongoose");

var newsletterEmail = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
});

var newsletter = mongoose.model("newsletters", newsletterEmail);
module.exports =  newsletter;