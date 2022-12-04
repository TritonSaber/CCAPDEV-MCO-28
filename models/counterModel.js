const mongoose = require("mongoose"); 


var counterModel = new mongoose.Schema({
    
    reserveID: {
        type: String,
        default:"resID"
    },
    
    totalRes: {
        type: Number,
        default:6
    }

});



var counter = mongoose.model("count", counterModel);


module.exports =  counter;
