const express = require("express");
const bodyParser =require("body-parser");

const account = require("../models/accountModel");
const reservation = require("../models/reservationModel");
const comment = require("../models/commentModel");
const like = require("../models/likeModel");
const manager = require("../models/managerModel")
const counter = require("../models/counterModel");

const bcrypt = require("bcrypt");
var activeUser;
var restaurantName;
var numLike;
var counts;


    //index page for general users
    const getIndex = ((req,res) => {
        if(activeUser){
            //redirects normal users to homepage
            if(activeUser.role == "User"){
                res.render('homepage', {
                title: "User"
                });
            //redirects Admins to the Admin dashboard
            }else if(activeUser.role =="Admin"){
                res.render('homepage', {
                    title: "Admin"
                });
            }else if(activeUser.role =="Manager"){
                res.render('homepage', {
                    title: "Manager"
                });
            }      
        }else
            res.render('homepage', {
            title: false
            });
        
    })
    //dashboard page for admin
    const getAccountList =  ( (req,res) => {
        account.find({role: ["User", "Manager"]}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                res.render('admin-AccountList', {
                    title: 'Accounts List',
                    accounts: rows
                })
            }

        })
})
    
    const getManagerList=  ( (req,res) => {
    manager.find({}, function(err, rows){
        if(err){
            console.log(err);
        }else{
            res.render('admin-ManagerList', {
                title: 'Managers List',
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
                                title: false
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
                cvv: req.body.cvv,
                monthexp: req.body.monthexp,
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
                    title: 'Username has been already taken! Try Again!',
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
                        res.render('reserve', {
                            likes: numLike,
                            comments: rows,
                            title: "User",
                        })
                    }else if(activeUser.role == "Admin"){
                        res.render('reserve', {
                            likes: numLike,
                            comments: rows,
                            title: "Admin",
                        })
                    }else if(activeUser.role == "Manager"){
                        res.render('reserve', {
                            likes: numLike,
                            comments: rows,
                            title: "Manager",
                        })
                    }
                }else{
                    res.render('reserve', {
                        likes: numLike,
                        comments: rows,
                        title: false,
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
                        res.render('max', {
                            likes: numLike,
                            comments: rows,
                            title: "User",
                        })
                    }else if(activeUser.role == "Admin"){
                        res.render('max', {
                            likes: numLike,
                            comments: rows,
                            title: "Admin",
                        })
                    }else if(activeUser.role == "Manager"){
                        res.render('max', {
                            likes: numLike,
                            comments: rows,
                            title: "Manager",
                        })
                    }
                }else
                    res.render('max', {
                        likes: numLike,
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
                        res.render('gerry', {
                            likes: numLike,
                            comments: rows,
                            title: "User",
                        })
                    }else if(activeUser.role == "Admin"){
                        res.render('gerry', {
                            likes: numLike,
                            comments: rows,
                            title: "Admin",
                        })
                    }else if(activeUser.role == "Manager"){
                        res.render('gerry', {
                            likes: numLike,
                            comments: rows,
                            title: "Manager",
                        })
                    }
                }else
                    res.render('gerry', {
                        likes: numLike,
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

    const getProf =  ((req,res)=>{

        account.find({username: activeUser.username}, function(err, rows){
            if(err){
                console.log(err);
            }else{
                if(activeUser){
                    res.render('profile', {
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

    // for footers and about page
    const getAbout =  ((req,res)=>{
        if(activeUser){
            if(activeUser.role == "User"){
                res.render('about', {
                    title: "User",
                })
            }else if(activeUser.role == "Admin"){
                res.render('about', {
                    title: "Admin",
                })
            }else if(activeUser.role == "Manager"){
                res.render('about', {
                    title: "Manager",
                })
            }
        }else
            res.render('about', {
                title: false,
            });
    })

    const getRefunds = ((req,res)=>{
        
        if(activeUser){
            if(activeUser.role == "User"){
                res.render('refunds', {
                    title: "User",
                })
            }else if(activeUser.role == "Admin"){
                res.render('refunds', {
                    title: "Admin",
                })
            }else if(activeUser.role == "Manager"){
                res.render('refunds', {
                    title: "Manager",
                })
            }
        }else
            res.render('refunds', {
                title: false,
            })
    })

    const getPaymentM = ((req,res)=>{
        if(activeUser){
            if(activeUser.role == "User"){
                res.render('paymentmethods', {
                    title: "User",
                })
            }else if(activeUser.role == "Admin"){
                res.render('paymentmethods', {
                    title: "Admin",
                })
            }else if(activeUser.role == "Manager"){
                res.render('paymentmethods', {
                    title: "Manager",
                })
            }
        }else
            res.render('paymentmethods',{
                title: false,
            })
    })

    const getJoinUs = ((req,res)=>{
        if(activeUser){
            if(activeUser.role == "User"){
                res.render('joinus', {
                    title: "User",
                })
            }else if(activeUser.role == "Admin"){
                res.render('joinus', {
                    title: "Admin",
                })
            }else if(activeUser.role == "Manager"){
                res.render('joinus', {
                    title: "Manager",
                })
            }
        }else
            res.render('joinus', {
                title: false,
            })
    })


    const getJoin = ((req,res)=>{
        if(activeUser){
            if(activeUser.role == "User"){
                res.render('join', {
                    title: "User",
                })
            }else if(activeUser.role == "Admin"){
                res.render('join', {
                    title: "Admin",
                })
            }else if(activeUser.role == "Manager"){
                res.render('join', {
                    title: "Manager",
                })
            }
        }else
            res.render('join', {
                title: false,
            })
    })

    

     // Add Sample Data!!
    const sampleData = ((req,res) =>{   
        
        
        account.findOne({username: "admin"}, function(err, accounts){
            if(!accounts){
                counter.insertMany({reserveID: "resID", totalRes: 1})

                //the password of sample accounts is 12345678
                account.insertMany([{name: "admin", 
                                    username: "admin",
                                    password: "$2b$10$qF9cyybIkHoXYdkLS1FpK.bdaS5DrcgrvicOpRC2KNhyQEZKHH302",
                                    bdate: 20021220,
                                    phone: 96754123,
                                    email: "admin_bookNeat@gmail.com",
                                    role: "Admin"},
                                    
                                    {name: "Chibog", 
                                    username: "Chibog",
                                    password: "$2b$10$qF9cyybIkHoXYdkLS1FpK.bdaS5DrcgrvicOpRC2KNhyQEZKHH302",
                                    bdate: 20011115,
                                    phone: 09345962837,
                                    email: "Chibog@gmail.com",
                                    role: "User"},

                                    {name: "Gutomz", 
                                    username: "Gutomz",
                                    password: "$2b$10$qF9cyybIkHoXYdkLS1FpK.bdaS5DrcgrvicOpRC2KNhyQEZKHH302",
                                    bdate: 20000909,
                                    phone: 09345962837,
                                    email: "Gutomz@gmail.com",
                                    role: "Manager"}])
                console.log("Sample Accounts are added!!");
            }
        })
    })
    sampleData();


module.exports = { getIndex, getReserve, getBook, postReserve, getRegister, postSave, getLogin, postLogin, 
    getLogout, postComment, getKuya, getMax, getGerry, getProf,  sampleData, getAccountList, getManagerList, getIndexMngr, 
    postEdit, postDelete, postManage, getClickLike, getAbout, getRefunds, getPaymentM,getJoinUs, getJoin, updateStatus, deleteRes};
    // getComment, postNewLike
