const express = require("express");
const bodyParser =require("body-parser");

const account = require("../models/accountModel");
const reservation = require("../models/reservationModel");
const comment = require("../models/commentModel");
const bcrypt = require("bcrypt");
var activeUser;
var restaurantName;

    const getIndex = ((req,res) => {
        if(activeUser){
            res.render('homepage', {
            title: true
        });
        }else
            res.render('homepage', {
            title: false
            });
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
    //#Other type of property in res.render other than title such as 'error' did not work
    //redirect towards the Signup page
    const getRegister =  ((req,res)=>{
        res.render('signup', {
            title: 'Sign Up Now!!'
        });
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
                    title: 'Username has been already taken! Try Again!'
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
            title: ''
        });
    })
    
    const getLogout =  ((req,res)=>{
        console.log(activeUser)
        activeUser = null;
        console.log(activeUser)

        res.redirect('/');

    })
    
    const postLogin =  ((req,res) =>{
        let pass= req.body.password;   
        let uName = req.body.username;

        account.findOne({username: uName}, function(err, accounts){
            activeUser = accounts
            if(accounts){
                let isValidPass = bcrypt.compareSync(pass, accounts.password );
                if(isValidPass){       
                    activeUser = accounts;         
                    res.redirect('/');
    
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

    const getKuya = ((req, res) => {
        restaurantName = "Kuya J";
        console.log(restaurantName);
        // res.redirect('/getcomment');
        comment.find({restaurant: restaurantName}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                if(activeUser){
                    res.render('reserve', {
                        comments: rows,
                        title: true,
                })
                }else
                    res.render('reserve', {
                        comments: rows,
                        title: false,
                    })
                
            }
        })
    })

    const getMax = ((req, res) => {
        restaurantName = "Max's Restaurant";
        console.log(restaurantName);
        // res.redirect('/getcomment');
        comment.find({restaurant: restaurantName}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                if(activeUser){
                    res.render('max', {
                        comments: rows,
                        title: true,
                })
                }else
                    res.render('max', {
                        comments: rows,
                        title: false,
                    })
            }
        })
    })

    const getGerry = ((req, res) => {
        restaurantName = "Gerry's Grill";
        console.log(restaurantName);
        // res.redirect('/getcomment');
        comment.find({restaurant: restaurantName}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                if(activeUser){
                    res.render('gerry', {
                        comments: rows,
                        title: true,
                })
                }else
                    res.render('gerry', {
                        comments: rows,
                        title: false,
                    })
            }
        })
    })

    const postComment = ((req, res) => {
        if(activeUser){
            var comments = new comment({
                restaurant: restaurantName,
                name: activeUser.name,
                comment_text: req.body.comment_text,
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

module.exports = { getIndex, getReserve, getBook, postReserve, getRegister, postSave, getLogin, postLogin, 
    getLogout, postComment, getKuya, getMax, getGerry};
    // getComment
