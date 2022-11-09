
const express = require("express");
const bodyParser =require("body-parser");

const account = require("../models/accountModel");
const reservation = require("../models/reservationModel");
const bcrypt = require("bcrypt");
var activeUser;


    const getIndex = ((req,res) => {
        console.log(activeUser)
        console.log();
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
    const getRegister =  ((req,res)=>{
        res.render('signup', {
            title: 'Sign Up Now!!'
        });
    })
    
    //Save the data into the database
    const postSave = ( (req,res) =>{
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
    const getLogin = ((req,res)=>{
        res.render('login', {
            title: ''
        });
    })
    
    const getLogout =  ((req,res)=>{
        res.redirect('/');
    })
    
    const postLogin =  ((req,res) =>{
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


module.exports = { getIndex, getReserve, getBook, postReserve, getRegister, postSave, getLogin, postLogin, getLogout};
