const path= require("path");
const express = require("express");
const bodyParser =require("body-parser");
const mongoose = require("mongoose"); 
const DateOnly = require("mongoose-dateonly")(mongoose);
const bcrypt = require("bcrypt");
//const route =  require('./routes/routes.js')


var activeUser;



var app = express();
//app.use('/', route);

mongoose.connect("mongodb://localhost:27017/ccapdev");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/public/views'));



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
});

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
var reserve = mongoose.model("reserves", reservation);


//Redirect towards the index page or homepage

app.get('/', (req,res) => {
    console.log(activeUser)

    res.render('homepage', {
        title: false
    });
})
 


app.get('/getreserve', (req,res) => {
                reserve.find({username: activeUser.username}, function(err, rows){
                    if(err){
                        console.log(err);
                    }else{
                        res.render('reserves', {
                            title: 'Your Reservations',
                            reservations: rows
                        })
                    }
                })
            });
app.get('/add',(req,res)=>{
    res.render('booking', {
        title: 'Reserve Now!!'
    });
});


app.post('/savereserve', (req,res) =>{
    var reserves = new reserve({
        restaurant: req.body.restaurant,
        name: activeUser.name,
        email: activeUser.email,
        phone: activeUser.phone,
        username: activeUser.username,
        datein: req.body.datein,
        timein: req.body.timein,
        numpeople: req.body.numpeople,
        card: req.body.card,
        cardnum: req.body.cardnum,
        cvv: req.body.cvv,
        monthexp: req.body.monthexp,

    })

    reserves.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/getreserve");
        }
    })
})


// User Registration - Working!   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//#Reminder: We used title to set true for login so we could change the header
//#Other type of property in rres.render other than title such as 'error' did not work
//redirect towards the Signup page
app.get('/register',(req,res)=>{
    res.render('signup', {
        title: 'Sign Up Now!!'
    });
});

//Save the data into the database
app.post('/saveaccount', (req,res) =>{
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(req.body.password, salt);

    var accounts = new account({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        bdate: req.body.bdate,
        phone: req.body.phone,
        email: req.body.email,
    })

    accounts.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.render('homepage',{
                title: true,
            });

        }
    })
})


//User Login - So far it is working! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Redirect towards the login page
app.get('/login',(req,res)=>{
    res.render('login', {
        title: ''
    });
});

app.get('/logout',(req,res)=>{
    res.redirect('/');
});

app.post('/postlogin', (req,res) =>{
    let pass= req.body.password;   
    let uName = req.body.username;

    //cant get the password
    //how to make this into global
    account.findOne({username: uName}, function(err, accounts){
        activeUser = accounts

        if(accounts){
            let isValidPass = bcrypt.compareSync(pass, accounts.password );
            if(isValidPass){       
                activeUser = accounts;         
                res.render('homepage',{
                title: true,
            });

            } else {
                res.render('login',{
                title: 'Login Failed. Wrong Password!!',
            });
        }
    

    } else{
        res.render('login',{
            title: 'Login Failed. Account Does Not Exist!!',
        });
    }
return activeUser;
})   


})





app.listen(3000,function(){
    console.log("server is running on http://localhost: 3000")
});
