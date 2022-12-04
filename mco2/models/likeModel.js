const mongoose = require("mongoose");

var likeNumber = new mongoose.Schema({
    restaurant: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0,
        required: true
    }
});

var like = mongoose.model("likes", likeNumber);
module.exports =  like;