const mongoose = require("mongoose");

var userComment = new mongoose.Schema({
    restaurant: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

var comment = mongoose.model("comments", userComment);
module.exports =  comment;