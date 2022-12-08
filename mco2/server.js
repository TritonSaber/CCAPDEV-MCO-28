require('dotenv').config();
const path= require("path");
const express = require("express");
const bodyParser =require("body-parser");
const mongoose = require("mongoose"); 
const account = require("./models/accountModel");

const route =  require('./routes/routes.js')

const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const app = express();

// mongoose.connect("mongodb://127.0.0.1:27017/ccapdev");

// mongoose.connect("mongodb+srv://CCAPDEV:almightyadmin@cluster0.bxe5tds.mongodb.net/ccapdev");



app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const atlas = "mongodb+srv://CCAPDEV:" + process.env.ATLAS_PASSWORD + "@cluster0.bxe5tds.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(atlas);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/public/views'));
app.use('/', route);


  




app.listen(3000,function(){
    console.log("server is running on http://localhost: 3000")
});
