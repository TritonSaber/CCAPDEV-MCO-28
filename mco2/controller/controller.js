const express = require("express");
const bodyParser =require("body-parser");

const account = require("../models/accountModel");
const reservation = require("../models/reservationModel");
const comment = require("../models/commentModel");
const like = require("../models/likeModel");
const manager = require("../models/managerModel")
const counter = require("../models/counterModel");
const newsletter = require("../models/newsletterModel");
const multer = require("multer");
const addSamples = require("../controller/sampleAdd");

const bcrypt = require("bcrypt");
var activeUser;
var restaurantName;
var numLike;
var counts;


    //index page for general users
    const getIndex = ((req,res) => {
        if(activeUser){
            let aUser;
            //redirects normal users to homepage
            if(activeUser.role == "User"){
                res.render('homepage',{aUser: "User", title: "Homepage"});
            //redirects Admins to the Admin dashboard
            }else if(activeUser.role =="Admin"){
                res.render('homepage', {aUser: "Admin",title: "Homepage"});
            }else if(activeUser.role =="Manager"){
                res.render('homepage', {aUser: "Manager",title: "Homepage"});
            }      
        }else
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
                manager.findOne({username: activeUser.username}, function(err, result){
                    if(err){
                        console.log(err)
                    }else{
                        if(result.restaurant == "Kuya J"){
                            getRestaurantReservations(req, res, result.restaurant, "Kuya J");
                        }else if(result.restaurant == "Gerry's Grill"){
                            getRestaurantReservations(req, res, result.restaurant, "Gerry's Grill");
                        }else if(result.restaurant == "Max's Restaurant"){
                            getRestaurantReservations(req, res, result.restaurant, "Max's Restaurant");
                        }else{
                            res.render('manager', {
                                title: "No Restaurant Assigned"
                            })
                        }
                    }
                })        
            }
    })

const getRestaurantReservations = ((req, res, result, restaurantName) => {
    if(result == restaurantName){
        reservation.find({restaurant: restaurantName}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                res.render('manager', {
                    title: restaurantName,
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
    manager.updateOne({username: req.body.username},{$set: {restaurant: req.body.restaurant} }, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/managerList");


        }
    })
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
    
    
    // User Registration - Working!   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const getRegister =  ((req,res)=>{
        res.render('signup', {title: 'Sign Up Now!!',error: ''});
    })
    
    //Save the data into the database
    const postSave = ( (req,res) =>{
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
    })
    
    
    //User Login - So far it is working! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    //Redirect towards the login page
    const getLogin = ((req,res)=>{
        res.render('login', {
            title: 'Login page',
            error: '',
        });
    })
    const getLogout =  ((req,res)=>{
        //console.log(activeUser)
        activeUser = null;
        //console.log(activeUser)

        res.redirect('/');

    })
    
    const postLogin =  ((req,res) =>{
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
        return activeUser;
        })   
    })

    // const postNewLike = ((req, res) => {
        // console.log('postNewLike');
        // var likes = new like({
        //     restaurant: restaurantName,
        // })
        // likes.save(function(err){
        //     if(err){
        //         console.log(err);
        //     }else{
        //         numLike = likes.like;
        //         console.log("Created new like");
        //         if(restaurantName === "Kuya J"){
        //             res.redirect("/getkuya");
        //         }
        //         else if(restaurantName === "Gerry's Grill"){
        //             res.redirect("/getgerry");
        //         }
        //         else if(restaurantName === "Max's Restaurant"){
        //             res.redirect("/getmax");
        //         }
        //     }
        // })
    // })

    const getClickLike = ((req, res) => {
        if(activeUser){
            console.log("postLike");
            numLike++;
            like.updateOne({restaurant: restaurantName}, {like: numLike}, function(err, result){
                if(err){
                    console.log(err);
                }
                else{
                    result[0] = numLike;
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

        }
        else{
            res.redirect('/login');
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

        comment.find({restaurant: restaurantName}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                if(activeUser){
                    if(activeUser.role == "User"){
                        res.render('reserve', {likes: numLike,comments: rows,aUser: "User",title: "Book n Eat - Kuya J",})
                    }else if(activeUser.role == "Admin"){
                        res.render('reserve', {likes: numLike,comments: rows,aUser: "Admin",title: "Book n Eat - Kuya J",})
                    }else if(activeUser.role == "Manager"){
                        res.render('reserve', {likes: numLike,comments: rows,aUser: "Manager",title: "Book n Eat - Kuya J",})
                    }
                }else{
                    res.render('reserve', {likes: numLike,comments: rows,aUser: false,title: "Book n Eat - Kuya J",
                    })
                }
            }
        })
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

        comment.find({restaurant: restaurantName}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                if(activeUser){
                    if(activeUser.role == "User"){
                        res.render('max', {likes: numLike,comments: rows, aUser: "User",title: "Book n Eat - Max's Restaurant",})
                    }else if(activeUser.role == "Admin"){ 
                        res.render('max', {likes: numLike,comments: rows, aUser: "Admin", title: "Book n Eat - Max's Restaurant",})
                    }else if(activeUser.role == "Manager"){
                        res.render('max', {likes: numLike,comments: rows, aUser: "Manager", title: "Book n Eat - Max's Restaurant",})
                    }
                }else
                    res.render('max', {likes: numLike,comments: rows, aUser: false, title: "Book n Eat - Max's Restaurant",})
            }
        })
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

        comment.find({restaurant: restaurantName}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                if(activeUser){
                    if(activeUser.role == "User"){
                        res.render('gerry', {likes: numLike,comments: rows,aUser: "User", title: "Book n Eat - Gerry's Grill",})
                    }else if(activeUser.role == "Admin"){
                        res.render('gerry', {likes: numLike,comments: rows,aUser: "Admin", title: "Book n Eat - Gerry's Grill",})
                    }else if(activeUser.role == "Manager"){
                        res.render('gerry', {likes: numLike,comments: rows,aUser: "Manager", title: "Book n Eat - Gerry's Grill",})
                    }
                }else
                res.render('gerry', {likes: numLike,comments: rows,aUser: false, title: "Book n Eat - Gerry's Grill ",})
            }
        })
    })

    const postComment = ((req, res) => {
        if(activeUser){
            var comments = new comment({
                restaurant: restaurantName,
                name: activeUser.name,
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
                if(activeUser){
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
        if(activeUser){
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
        
        if(activeUser){
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

    const getPaymentM = ((req,res)=>{
        if(activeUser){
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
        if(activeUser){
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
        if(activeUser){
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

    const postNewsletter = ((req, res)=>{
        let userEmail = req.body.email;

        newsletter.findOne({email: userEmail}, function(err, emailResult){
            if(err){
                console.log(err);
            }else if(emailResult){
                if(activeUser){
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
                        if(activeUser){
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


    const getEdit =  ((req,res)=>{
       
        account.find({username: activeUser.username}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                if(activeUser){
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
                    console.log(activeUser.username);
                    res.redirect("/getprof");
                }
            })
    })

     // Add Sample Data!!
 
    addSamples.sampleData();


module.exports = { getIndex, getReserve, getBook, postReserve, getRegister, postSave, getLogin, postLogin, getLogout, 
    postComment, getKuya, getMax, getGerry, getProf, getAccountList, getManagerList, getIndexMngr, postEdit, postDelete, 
    postManage, getClickLike, getAbout, getRefunds, getPaymentM,getJoinUs, getJoin, updateStatus, deleteRes, postNewsletter
    ,getEdit, postProfile};
    // getComment, postNewLike
