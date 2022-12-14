const express = require("express");
const bodyParser =require("body-parser");

const account = require("../models/accountModel");
const reservation = require("../models/reservationModel");
const comment = require("../models/commentModel");
const like = require("../models/likeModel");
const manager = require("../models/managerModel")
const counter = require("../models/counterModel");
const newsletter = require("../models/newsletterModel");
const restaurant = require("../models/restaurantModel");

const multer = require("multer");
const addSamples = require("../controller/sampleAdd");

const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");


var activeUser;
var restaurantName;
var numLike;
var counts;

var isLikedKuya = false;
var isLikedGerry = false;
var isLikedMax = false;

passport.use(account.createStrategy());
passport.serializeUser(account.serializeUser());
passport.deserializeUser(account.deserializeUser());

//passport and sessions ====================================================================================================================================================

    const getRegister =  ((req,res)=>{
        res.render('signup', {title: 'Sign Up Now!!',error: ''});
    })
    
    const getLogin = ((req,res)=>{
    res.render('login', {
        title: 'Login Page',
        error : ''

        });
    })

    const errorLogin = ((req,res)=>{
        res.render('login', {
            title: 'Error - Login',
            error : 'Incorrect username/password'

            });
        })

    const getLogout =  ((req,res)=>{
        req.logout(function(err){
            if (err){ 
                console.log(err);
            }
            isLikedGerry = false;
            isLikedKuya = false;
            isLikedMax = false;
            req.session.destroy();
            activeUser = null;
            // console.log(activeUser);
            // console.log(req.session);
            res.redirect("/");
          });

    })
    
    const postLogin =  ((req,res) =>{
        account.findOne({username: req.body.username}, function(err, accounts){
            if(accounts){
            req.login(accounts, function (err) {
                if (err) {
                  console.log(err);
                } else {
                  passport.authenticate("local", {failureRedirect: '/errorlogin'})(req, res, function () {
                    req.session.user = accounts;
                    console.log(req.session.user);
                    activeUser = req.session.user;
                    console.log(activeUser);
                    res.redirect("/");
                  });
                }
              });
            }else{
                res.render('login',{title: 'Error - Login', error: 'Login Failed. Account Does Not Exist!!'});
            }
        })
        
          

          return activeUser;
        /*
        let pass= req.body.password;   
        let uName = req.body.username;
        account.findOne({username: uName}, function(err, accounts){
            if(accounts){
                let isValidPass = bcrypt.compareSync(pass, accounts.password );
                if(isValidPass){       
                    activeUser = accounts;         
                    res.redirect('/');
    
                } else {
                    res.render('login',{title: 'Error - Login', error: 'Login Failed. Wrong Password!!'});
            }
            } else{
                res.render('login',{title: 'Error - Login', error: 'Login Failed. Account Does Not Exist!!'});
            }
        })   
        */
   })

const postSave = ( (req,res) =>{
    account.register(
        {   username: req.body.username,
            name: req.body.name,
            bdate: req.body.bdate,
            phone: req.body.phone,
            email: req.body.email, },
            req.body.password,
        function (err, user) {
          if (err) {
            console.log(err);
            res.render('signup', {title: 'Sign Up Now!!',error: 'Username has already been taken!!'});
          } else {
            passport.authenticate("local")(req, res, function () {
              res.redirect("/login");
            });
          }
        }
      );

    /*
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(req.body.password, salt);
    var uName = req.body.username; 
    account.findOne({username: uName}, function(err, accounts){
        if(err)
            console.log(err);

        if(accounts){
            res.render('signup', {
                title: 'Oh no, Sign up error',
                error: 'Username has been already taken! Try Again!'
            });
        }else{
            var accounts = new account({
                name: req.body.name,
                username: uName,
                password: hash,
                bdate: req.body.bdate,
                phone: req.body.phone,
                email: req.body.email,
            })
            accounts.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/login')
                }
            })
        }
    })
    */
})



//end ======================================================================================================================================================================




    //index page for general users
    const getIndex = ((req,res) => {
            if (req.isAuthenticated()) {              
            //redirects normal users to homepage
                if(activeUser.role == "User"){
                    res.render('homepage',{aUser: "User", title: "Homepage"});
            //redirects Admins to the Admin dashboard
                }else if(activeUser.role =="Admin"){
                    res.render('homepage', {aUser: "Admin",title: "Homepage"});
                }else if(activeUser.role =="Manager"){
                    res.render('homepage', {aUser: "Manager",title: "Homepage"});
                }      
            } else
                res.render('homepage', {aUser: false,title: "Homepage"});  
    })
    //dashboard page for admin
    const getAccountList =  ( (req,res) => {
        account.find({role: ["User", "Manager"]}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                res.render('admin-AccountList', {title: 'Dashboard - Accounts List', accounts: rows})
            }

        })
})
    
    const getManagerList=  ( (req,res) => {
    manager.find({}, function(err, rows){
        if(err){
            console.log(err);
        }else{
            res.render('admin-ManagerList', {
                title: 'Dashboard - Managers List',
                managers: rows
            })
        }
    })
})
    

const postEdit = ((req,res) =>{
    account.updateOne({username: req.body.username},{$set: {role: req.body.role} }, function(err){
        if(err){
            console.log(err);
        }else{      
            account.findOne({username: req.body.username}, function(err, accounts){
                if(err){
                    console.log(err);
                }else{
                    if(accounts.role == "Manager"){
                        manager.findOne({username: accounts.username}, function(err, managers){
                            if(err)
                                console.log(err);

                            if(!managers){
                                var managers = new manager({
                                    name: accounts.name,
                                    username: accounts.username,
                                    email: accounts.email,
                                    phone: accounts.phone
                            
                                })
                                managers.save()
                            }
                        })   
                    }else{   
                        manager.deleteOne({username: accounts.username}, function(err){
                            if(err){
                                console.log(err);
                            }
                        })
                            
                         
                    }
                }
            })  
            res.redirect("/accountList");

        }


    })
})

const postDelete = ((req,res) =>{
    account.deleteOne({username: req.body.username}, function(err){
        if(err){
            console.log(err);
        }else{
            manager.deleteOne({username: req.body.username}, function(err, accounts){
                if(err){
                    console.log(err);
                }
            })
            res.redirect("/accountList");
        }
    })
})


const getIndexMngr = ((req,res) => {
            //redirects Managers to their dashboard
             if(activeUser.role =="Manager"){
                manager.findOne({username: activeUser.username}, function(err, user){
                    if(err){
                        console.log(err)
                    }else{
                        restaurant.findOne({restaurantID: user.restaurantID}, function(err, result){
                            if(result.restaurantID == 1){
                                getRestaurantReservations(req, res, result.restaurantname, "Gerry's Grill", "Manila");
                            }else if(result.restaurantID == 2){
                                getRestaurantReservations(req, res, result.restaurantname, "Gerry's Grill", "Makati");
                            }else if(result.restaurantID == 3){
                                getRestaurantReservations(req, res, result.restaurantname, "Kuya J", "Manila");
                            }else if(result.restaurantID == 4){
                                getRestaurantReservations(req, res, result.restaurantname, "Kuya J", "Makati");
                            }else if(result.restaurantID == 5){
                                getRestaurantReservations(req, res, result.restaurantname, "Max's Restaurant", "Manila");
                            }else if(result.restaurantID == 6){
                                getRestaurantReservations(req, res, result.restaurantname, "Max's Restaurant", "Makati");
                            }else{
                                res.render('manager', {
                                    title: "No Restaurant Assigned"
                                })
                            }
                        })
                        
                    }
                })        
            }
    })

const getRestaurantReservations = ((req, res, result, restaurantName, branchName) => {
    if(result == restaurantName){
        reservation.find({restaurant: restaurantName, branch: branchName}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                res.render('manager', {
                    title: restaurantName,
                    branch: branchName,
                    reservations: rows
                })
            }
        })
    }
})

const updateStatus = ((req,res) =>{
    reservation.updateOne({resID: req.body.resID}, {$set: {status: req.body.status}},function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result)
            res.redirect("/manager");
        }

    })

})

const deleteRes = ((req,res) =>{
    reservation.deleteOne({resID: req.body.resID},function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result)
            res.redirect("/manager");
        }

    })
})

     
    
    const postManage = ((req,res) =>{
      
        if (req.body.restaurant == "Gerry's Grill"){
            if (req.body.branch == "Manila"){
            manager.updateOne({username: req.body.username},{$set: {restaurant: req.body.restaurant, restaurantID: 1}}, function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/managerList");
                }
            })
        }
        }
        else if (req.body.restaurant == "Gerry's Grill"){
            if (req.body.branch == "Makati"){
            manager.updateOne({username: req.body.username},{$set: {restaurant: req.body.restaurant, restaurantID: 2} }, function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/managerList");
                }
            })
        }
        }
        else if (req.body.restaurant == "Kuya J"){
            if (req.body.branch == "Manila"){
            manager.updateOne({username: req.body.username},{$set: {restaurant: req.body.restaurant,restaurantID: 3} }, function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/managerList");
                }
            })
        }
        }
        else if (req.body.restaurant == "Kuya J"){
            if (req.body.branch == "Makati"){
            manager.updateOne({username: req.body.username},{$set: {restaurant: req.body.restaurant,restaurantID: 4} }, function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/managerList");
                }
            })
        }
    }
        else if (req.body.restaurant == "Max's Restaurant"){
            if (req.body.branch == "Manila"){
            manager.updateOne({username: req.body.username},{$set: {restaurant: req.body.restaurant,restaurantID: 5} }, function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/managerList");
                }
            })
        }
        }
        else if (req.body.restaurant == "Max's Restaurant" && req.body.branch == "Makati"){
             if (req.body.branch == "Makati"){
            manager.updateOne({username: req.body.username},{$set: {restaurant: req.body.restaurant,restaurantID: 6} }, function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/managerList");
                }
            })
        }
    }
     
})
    
    
    const getReserve =  ( (req,res) => {
                    reservation.find({username: activeUser.username}, function(err, rows){
                        if(err){
                            console.log(err);
                        }else{
                            res.render('reserves', {
                                title: 'Your Reservations',
                                reservations: rows
                            })
                        }
                    })
    })

    const getBook =  ((req,res)=>{
        res.render('booking', {
            title: 'Reserve Now!!'
        });
    })
    
    
      const postReserve = ((req,res) =>{
        counter.findOne({}, function(err, result){
            counts = result.totalRes;
            var reserves = new reservation({
                restaurant: req.body.restaurant,
                branch: req.body.branch,
                name: activeUser.name,
                email: activeUser.email,
                phone: activeUser.phone,
                username: activeUser.username,
                datein: req.body.datein,
                timein: req.body.timein,
                numpeople: req.body.numpeople,
                card: req.body.card,
                cardnum: req.body.cardnum,
                // cvv: req.body.cvv,
                // monthexp: req.body.monthexp,
                resID: counts
            })
            reserves.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/getreserve");
                }
            })
            counts++
            counter.updateOne({reserveID: "resID"}, {totalRes: counts}, function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log(counts)
                }
            })

        })
    })
    
    


    const getClickLike = ((req, res) => {
        if((isLikedKuya == false && restaurantName == "Kuya J") || (isLikedGerry == false && restaurantName == "Gerry's Grill") || 
            (isLikedMax == false && restaurantName == "Max's Restaurant")){
            if(req.isAuthenticated()){
                console.log("postLike");
                numLike++;
                like.updateOne({restaurant: restaurantName}, {like: numLike}, function(err, result){
                    if(err){
                        console.log(err);
                    }
                    else{
                        result[0] = numLike;
                        if(restaurantName === "Kuya J"){
                            isLikedKuya = true;
                            res.redirect("/getkuya");
                        }
                        else if(restaurantName === "Gerry's Grill"){
                            isLikedGerry = true;
                            res.redirect("/getgerry");
                        }
                        else if(restaurantName === "Max's Restaurant"){
                            isLikedMax = true;
                            res.redirect("/getmax");
                        }
                    }
                })

            }
            else{
                res.redirect('/login');
            }
        }
        else{
            if(restaurantName === "Kuya J"){
                isLikedKuya = true;
                res.redirect("/getkuya");
            }
            else if(restaurantName === "Gerry's Grill"){
                isLikedGerry = true;
                res.redirect("/getgerry");
            }
            else if(restaurantName === "Max's Restaurant"){
                isLikedMax = true;
                res.redirect("/getmax");
            }
        }
    })

    const getKuya = ((req, res) => {
        restaurantName = "Kuya J";
        console.log(restaurantName);
        // res.redirect('/getcomment');
        like.find({restaurant: restaurantName}, function(err, result){
            if(err){
                console.log(err);
            }
            else{
                if(result[0] === undefined){
                    console.log("NULL");
                    // res.redirect('/postnewlike');

                    // postnewlike
                    var likes = new like({
                        restaurant: restaurantName,
                    })
                    likes.save(function(err){
                        if(err){
                            console.log(err);
                        }else{
                            numLike = likes.like;
                            console.log(numLike);
                        }
                    })
                    // postnewlike
                }
                else{
                    numLike = result[0].like;
                }
            }
        })

        getResBranch(req,res,3, "reserve", "Book n Eat - Kuya J");

    })

    const getMax = ((req, res) => {
        restaurantName = "Max's Restaurant";
        console.log(restaurantName);
        // res.redirect('/getcomment');
        like.find({restaurant: restaurantName}, function(err, result){
            if(err){
                console.log(err);
            }
            else{
                if(result[0] === undefined){
                    console.log("NULL");
                    // res.redirect('/postnewlike');

                    //postnewlike
                    var likes = new like({
                        restaurant: restaurantName,
                    })
                    likes.save(function(err){
                        if(err){
                            console.log(err);
                        }else{
                            numLike = likes.like;
                        }
                    })
                    //postnewlike
                }
                else{
                    numLike = result[0].like;
                }
            }
        })

        getResBranch(req,res,5, "max", "Book n Eat - Max's Restaurant");

    })

    const getGerry = ((req, res) => {
        restaurantName = "Gerry's Grill";
        console.log(restaurantName);
        // res.redirect('/getcomment');
        like.find({restaurant: restaurantName}, function(err, result){
            if(err){
                console.log(err);
            }
            else{
                if(result[0] === undefined){
                    console.log("NULL");
                    // res.redirect('/postnewlike');

                    //postnewlike
                    var likes = new like({
                        restaurant: restaurantName,
                    })
                    likes.save(function(err){
                        if(err){
                            console.log(err);
                        }else{
                            numLike = likes.like;
                        }
                    })
                    //postnewlike
                }
                else{
                    numLike = result[0].like;
                }
            }
        })
        getResBranch(req,res,1, "gerry", "Book n Eat - Gerry's Grill");
    })

    const postBranch = (req,res, ) => {
        if(req.body.branch == "Manila"){
            if(req.body.resName == "Gerry's Grill"){
                getResBranch(req,res,1, "gerry", "Book n Eat - Gerry's Grill")
            }else if(req.body.resName == "Kuya J"){
                getResBranch(req,res,3, "reserve", "Book n Eat - Kuya J")
            }else if(req.body.resName == "Max's Restaurant"){
                getResBranch(req,res,5, "max", "Book n Eat - Max's Restaurant")
            }
        }else if(req.body.branch == "Makati"){
            if(req.body.resName == "Gerry's Grill"){
                getResBranch(req,res,2, "gerry", "Book n Eat - Gerry's Grill")
            }else if(req.body.resName == "Kuya J"){
                getResBranch(req,res,4, "reserve", "Book n Eat - Kuya J")
            }else if(req.body.resName == "Max's Restaurant"){
                getResBranch(req,res,6, "max", "Book n Eat - Max's Restaurant")
            }
        }
    }
    const getResBranch = ((req,res, id, name, pagetitle) => {
        restaurant.findOne({restaurantID: id}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                comment.find({restaurantID: id}, function(err, results){
                    if(req.isAuthenticated()){
                        if(activeUser.role == "User"){
                            res.render(name, {likes: numLike,comments: results, resPhone:rows.phone, branch: rows.branch, address:rows.address, aUser: "User", title: pagetitle})
                        }else if(activeUser.role == "Admin"){
                            res.render(name, {likes: numLike,comments: results,  resPhone:rows.phone, branch: rows.branch, address:rows.address, aUser: "Admin", title: pagetitle})
                        }else if(activeUser.role == "Manager"){
                            res.render(name, {likes: numLike,comments: results,  resPhone:rows.phone, branch: rows.branch, address:rows.address, aUser: "Manager", title: pagetitle})
                        }
                    }else
                    res.render(name, {likes: numLike,comments: results,  resPhone:rows.phone, branch: rows.branch, address:rows.address, aUser: false, title: pagetitle})
                })
            }
        })
    })


    const postComment = ((req, res) => {
        if(req.isAuthenticated()){
            var comments = new comment({
                restaurant: restaurantName,
                restaurantID: req.body.resID,
                name: activeUser.name,
                username: activeUser.username,
                comment_text: req.body.comment_text,
                image: activeUser.image
            })
            comments.save(function(err){
                if(err){
                    console.log(err);
                }
                else{
                    if(restaurantName === "Kuya J"){
                        res.redirect("/getkuya");
                    }
                    else if(restaurantName === "Gerry's Grill"){
                        res.redirect("/getgerry");
                    }
                    else if(restaurantName === "Max's Restaurant"){
                        res.redirect("/getmax");
                    }
                }
            })
        }else{
            res.redirect('/login')
        }
    })

    const getProf =  ((req,res)=>{
        account.find({username: activeUser.username}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                if(req.isAuthenticated()){
                     if(activeUser.role == "User"){
                        res.render('profile', {   
                            name: activeUser.name,
                            phone: activeUser.phone,
                            username: activeUser.username,
                            email: activeUser.email,
                            bdate: activeUser.bdate,
                            image: activeUser.image,
                            aUser: "User"})
                     }else if(activeUser.role == "Manager"){
                        res.render('profile', {   
                            name: activeUser.name,
                            phone: activeUser.phone,
                            username: activeUser.username,
                            email: activeUser.email,
                            bdate: activeUser.bdate,
                            image: activeUser.image,
                            aUser: "Manager"})
                    }else{
                        res.render('profile', {   aUser: false})
                    }
                }
               
            }
        })

    })


    // for footers and about page
    const getAbout =  ((req,res)=>{
        if(req.isAuthenticated()){
            if(activeUser.role == "User"){
                res.render('about', {aUser: "User",title: "About Us"})
            }else if(activeUser.role == "Admin"){
                res.render('about', {aUser: "Admin",title: "About Us"})
            }else if(activeUser.role == "Manager"){
                res.render('about', {aUser: "Manager",title: "About Us"})
            }
        }else
        res.render('about', {aUser: false, title: "About Us"})

    })

    const getRefunds = ((req,res)=>{
        
        if(req.isAuthenticated()){
            if(activeUser.role == "User"){
                res.render('refunds', {aUser: "User",title: "Refunds"})
            }else if(activeUser.role == "Admin"){
                res.render('refunds', {aUser: "Admin",title: "Refunds"})
            }else if(activeUser.role == "Manager"){
                res.render('refunds', {aUser: "Manager",title: "Refunds"})
            }
        }else
        res.render('refunds', {aUser: false, title: "Refunds"})
    })

    const getRestos = ((req,res)=>{
        
        if(req.isAuthenticated()){
            if(activeUser.role == "User"){
                res.render('restaurants', {aUser: "User",title: "Restaurants"})
            }else if(activeUser.role == "Admin"){
                res.render('restaurants', {aUser: "Admin",title: "Restaurants"})
            }else if(activeUser.role == "Manager"){
                res.render('restaurants', {aUser: "Manager",title: "Restaurants"})
            }
        }else
        res.render('restaurants', {aUser: false, title: "Restaurants"})
    })

    const getPaymentM = ((req,res)=>{
        if(req.isAuthenticated()){
            if(activeUser.role == "User"){
                res.render('paymentmethods', {aUser: "User",title: "Payment Methods"})
            }else if(activeUser.role == "Admin"){
                res.render('paymentmethods', {aUser: "Admin",title: "Payment Methods"})
            }else if(activeUser.role == "Manager"){
                res.render('paymentmethods', {aUser: "Manager",title: "Payment Methods"})
            }
        }else
        res.render('paymentmethods', {aUser: false, title: "Payment Methods"})
    })

    const getJoinUs = ((req,res)=>{
        if(req.isAuthenticated()){
            if(activeUser.role == "User"){
                res.render('joinus', {aUser: "User",title: "Join us! Come be a part of our network!"})
            }else if(activeUser.role == "Admin"){
                res.render('joinus', {aUser: "Admin",title: "Join us! Come be a part of our network!"})
            }else if(activeUser.role == "Manager"){
                res.render('joinus', {aUser: "Manager",title: "Join us! Come be a part of our network!"})
            }
        }else
        res.render('joinus', {aUser: false, title: "Join us! Come be a part of our network!"})
    })


    const getJoin = ((req,res)=>{
        if(req.isAuthenticated()){
            if(activeUser.role == "User"){
                res.render('join', {aUser: "User",title: "Join us! Be a Book n Eat Eater!"})
            }else if(activeUser.role == "Admin"){
                res.render('join', {aUser: "Admin",title: "Join us! Be a Book n Eat Eater!"})
            }else if(activeUser.role == "Manager"){
                res.render('join', {aUser: "Manager",title: "Join us! Be a Book n Eat Eater!"})
            }
        }else
        res.render('join', {aUser: false, title: "Join us! Be a Book n Eat Eater!"})
    })


    const getBookingInfo = ((req,res)=>{
        
        if(req.isAuthenticated()){
            if(activeUser.role == "User"){
                res.render('bookinginfo', {aUser: "User",title: "Booking Information"})
            }else if(activeUser.role == "Admin"){
                res.render('bookinginfo', {aUser: "Admin",title: "Booking Information"})
            }else if(activeUser.role == "Manager"){
                res.render('bookinginfo', {aUser: "Manager",title: "Booking Information"})
            }
        }else
        res.render('bookinginfo', {aUser: false, title: "Booking Information"})
    })

    const postNewsletter = ((req, res)=>{
        let userEmail = req.body.email;

        newsletter.findOne({email: userEmail}, function(err, emailResult){
            if(err){
                console.log(err);
            }else if(emailResult){
                if(req.isAuthenticated()){
                    if(activeUser.role == "User"){
                        res.render('newsletter', {aUser:"User", title: "News Letter",status: "<h2>Failure!</h2><br><h3>Your email already exists in the newsletter!</h3>",})
                    }else if(activeUser.role == "Admin"){
                        res.render('newsletter', {aUser:"Admin", title: "News Letter",status: "<h2>Failure!</h2><br><h3>Your email already exists in the newsletter!</h3>",})
                    }else if(activeUser.role == "Manager"){
                        res.render('newsletter', {aUser: "Manager", title: "News Letter",status: "<h2>Failure!</h2><br><h3>Your email already exists in the newsletter!</h3>",})
                    }
                }else
                    res.render('newsletter', {aUser:false, title: "News Letter",status: "<h2>Failure!</h2><br><h3>Your email already exists in the newsletter!</h3>",})
            }else{
                var news = new newsletter({
                    email: req.body.email,
                })
                news.save(function(err){
                    if(err){
                        console.log(err);
                    }else{
                        if(req.isAuthenticated()){
                            if(activeUser.role == "User"){
                                res.render('newsletter', {aUser: "User", title: "News Letter",status: "<h2>Success</h2><br><h3>Your email has been added to the newsletter!</h3>",
                                })
                            }else if(activeUser.role == "Admin"){
                                res.render('newsletter', {aUser: "Admin", title: "News Letter",status: "<h2>Success</h2><br><h3>Your email has been added to the newsletter!</h3>",
                                })
                            }else if(activeUser.role == "Manager"){
                                res.render('newsletter', {aUser: "Manager",title: "News Letter",status: "<h2>Success</h2><br><h3>Your email has been added to the newsletter!</h3>",
                                })
                            }
                        }else
                            res.render('newsletter', {aUser: false, title: "News Letter",status: "<h2>Success</h2><br><h3>Your email has been added to the newsletter!</h3>",
                            })
                    }
                })
            }
        })
    })

    const getReset = ((req, res)=>{
        res.render('forgotpassword', {
            title: "Reset Password",
            error: '',
        })
    })


    const postResetPassword = ((req, res)=>{
        account.findOne({username: req.body.username, phone: req.body.phone, email:req.body.email}, function(err, accounts){
            if(err){
                console.log(err);
            }
            else if(!accounts){
                res.render('forgotpassword', {
                    title: "Reset Password",
                    error: 'Wrong credentials or user does not exist!',
                })
            }
            else if(accounts.role == "Manager" || accounts.role == "Admin"){
                res.render('forgotpassword', {
                    title: "Reset Password",
                    error: 'Admins and Managers cannot change their password here!',
                })
            }
            else{
                account.deleteOne({username: req.body.username}, function(err, accounts){console.log(err)});
                account.register( 
                    {   username: accounts.username,
                        name: accounts.name,
                        bdate: accounts.bdate,
                        phone: accounts.phone,
                        email: accounts.email, 
                        image: accounts.image, },
                        req.body.password,
                        function (err, user) {
                        if (err) {
                            console.log(err);
                        } else {
                            passport.authenticate("local")(req, res, function () {
                            res.redirect("/login");
                          });
                        }
                      });
            }
        })
    })

    const getEdit =  ((req,res)=>{
       
        account.find({username: activeUser.username}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                if(req.isAuthenticated()){
                    res.render('editprof', {
                        name: activeUser.name,
                        phone: activeUser.phone,
                        username: activeUser.username,
                        email: activeUser.email,
                        bdate: activeUser.bdate
                    });
                }
               
            }
        })
    })

    const postProfile = ((req, res) => {

        
        activeUser.name = req.body.name;
        activeUser.phone = req.body.phone;
        activeUser.email = req.body.email;
        activeUser.bdate = req.body.bdate;
        activeUser.image = req.file.filename;
        
        account.updateOne({username: activeUser.username},{$set: {name: req.body.name, phone: req.body.phone, email: req.body.email, 
            bdate: req.body.bdate, image: req.file.filename}}, function(err){
                if(err){
                    console.log(err);
                }
                else{
                    comment.updateMany({username: activeUser.username}, {$set: {name:req.body.name, image:req.file.filename}}, function(err){
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log(activeUser.username);
                            res.redirect("/getprof");
                        }
                    })
                }
            })
    })

     // Add Sample Data!!
 
    addSamples.sampleData();


module.exports = { getIndex, getReserve, getBook, postReserve, getRegister, postSave, getLogin, errorLogin, postBranch, getLogout,postLogin,
        postComment, getKuya, getMax, getGerry, getProf, getAccountList, getManagerList, getIndexMngr, postEdit, postDelete, 
        postManage, getClickLike, getAbout, getRefunds, getPaymentM,getJoinUs, getJoin, updateStatus, deleteRes, postNewsletter
        ,getEdit, postProfile, getReset, postResetPassword, getRestos, getBookingInfo};
    // getComment, postNewLike
    //