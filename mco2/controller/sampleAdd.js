
const account = require("../models/accountModel");
const reservation = require("../models/reservationModel");
const comment = require("../models/commentModel");
const like = require("../models/likeModel");
const manager = require("../models/managerModel")
const counter = require("../models/counterModel");
const sampleData = ((req,res) =>{   
        
        
    account.findOne({username: "admin"}, function(err, accounts){
        if(!accounts){

            //the password used for the sample accounts
            //admin password: almightyadmin
            
            //users       passwords
            //ImNo.1User: bestreservation
            //HabenDogs: bossdogs
            //Chibog: chiboggers
            
            
            //managers
            //Tatsulok: ilovechicken
            //meathead: ilovemeat
            //Gutomz: ilovetwice
            //Rolling: pikachumain
            //Player1: catastrophe
            account.insertMany([{name: "admin", 
                                username: "admin",
                                password: "$2b$10$uG7c1v495OL7oxgmbXztFOjDB48.Aj5vC8Tgs7eBbVyQNYYrz3/G6",
                                bdate: 20021220,
                                phone: "09848873346",
                                email: "admin_bookNeat@gmail.com",
                                role: "Admin"},
                                
                                {name: "Miguel Alvorado", 
                                username: "ImNo.1User",
                                password: "$2b$10$9nEDlvoM7IM6Yd7G1CvGieZfe58mQmV4kLYCPa5PFTl3FJSblHixS",
                                bdate: 19991127,
                                phone: "09967541234",
                                email: "Miguel_Alvorado@gmail.com",
                                role: "User"},

                                {name: "Kali Don", 
                                username: "HabenDogs",
                                password: "$2b$10$zS375w0zPLe747hh5BGqZ.d7bRyPZEvNkBaqPachbe1ER8BMtbJRO",
                                bdate: 20010203,
                                phone: "09563473486",
                                email: "Kali_Don@gmail.com",
                                role: "User"},
                                
                                {name: "Nathalie Porter", 
                                username: "Chibog",
                                password: "$2b$10$PKiVoATItmqDZ7mpnnkmRuQZZXHYiIQUpcg2i2vO8wbR/cvHs4Z0K",
                                bdate: 19980819,
                                phone: "09930390483",
                                email: "Naliport@gmail.com",
                                role: "User"},

                                {name: "Chiz Escudero", 
                                username: "Tatsulok",
                                password: "$2b$10$WhQXmcsISVHsdRrl4vbraeV7URe/TmSZBJ6tk8NajICDKmWzUt/I6",
                                bdate: 19910423,
                                phone: "09345962837",
                                email: "Itsbamboog@gmail.com",
                                role: "Manager"},

                                {name: "Dyis Jenkins", 
                                username: "meathead",
                                password: "$2b$10$nxwDSaeESGHuruGVnaTDVO8fIOWhGoDBdI1nwSo/j3QklLyO/H/5O",
                                bdate: 19930625,
                                phone: "09949470483",
                                email: "leeroyjenkinsg@gmail.com",
                                role: "Manager"},

                                {name: "Gabriel Cruz", 
                                username: "Gutomz",
                                password: "$2b$10$VipdVhsDgXPa.djyly2qxehZI9KIW0KZkkZlRHrt1JM6KRjv1en7q",
                                bdate: 19991012,
                                phone: "09345962837",
                                email: "Gutomz@gmail.com",
                                role: "Manager"},
                            
                                {name: "Roelle Rolder", 
                                username: "Rolling",
                                password: "$2b$10$/1h3FXykfwypaUGWx5M50OWDG1dRvUdz5RBNnq5fitNk8ALqaLAvy",
                                bdate: 20000214,
                                phone: "09020399381",
                                email: "Rollerg@gmail.com",
                                role: "Manager"},
                            
                                {name: "Hannah Santos", 
                                username: "Player1",
                                password: "$2b$10$YXDUZD3b470eC3fLEAE4y.qpFG8UptOiQz9bCWOv95ICXGqS4K7vO",
                                bdate: 20000528,
                                phone: "09839387463",
                                email: "HsP1g@gmail.com",
                                role: "Manager"},
                            

                                ])

            manager.insertMany([{name: "Gabriel Cruz", 
                                username: "Gutomz",
                                email: "Gutomz@gmail.com",
                                phone:  "09345962837",
                                restaurant: "Gerry's Grill"},

                                {name: "Dyis Jenkins", 
                                username: "meathead",
                                email: "leeroyjenkinsg@gmail.com",
                                phone:  "09949470483",
                                restaurant: "Max's Restaurant"},

                                {name: "Chiz Escudero", 
                                username: "Tatsulok",
                                email: "Itsbamboog@gmail.com",
                                phone:  "09345962837",
                                restaurant: "Max's Restaurant"},

                                {name: "Roelle Rolder", 
                                username: "Rolling",
                                email: "Rollerg@gmail.com",
                                phone:  "09020399381",
                                restaurant: "Kuya J"},

                                {name: "Hannah Santos", 
                                username: "Player1",
                                email: "HsP1g@gmail.com",
                                phone:  "09839387463",
                                restaurant: "Kuya J"},
                                ])
            

            reservation.insertMany([
                                {restaurant: "Gerry's Grill",
                                name: "Miguel Alvorado",
                                email: "Miguel_Alvorado@gmail.com",
                                phone: "09848873346",
                                username: "ImNo.1User",
                                datein: 20221224,
                                timein: "6:00 pm",
                                numpeople: "2 People",
                                card: "visa",
                                cardnum: 1938038503922243,
                                resID: 1},

                                {restaurant: "Kuya J",
                                name: "Miguel Alvorado",
                                email: "Miguel_Alvorado@gmail.com",
                                phone: "09848873346",
                                username: "ImNo.1User",
                                datein: 20221129,
                                timein: "1:00 pm",
                                numpeople: "4 People",
                                card: "mastercard",
                                cardnum: 0977398428373383,
                                resID: 2},

                                {restaurant: "Kuya J",
                                name: "Kali Don",
                                email: "Kali_Don@gmail.com",
                                phone: "09563473486",
                                username: "HabenDogs",
                                datein: 20221130,
                                timein: "12:00 pm",
                                numpeople: "6 People",
                                card: "paypal",
                                cardnum: 2395059300313928,
                                resID: 3},


                                
                                {restaurant: "Max's Restaurant",
                                name: "Kali Don",
                                email: "Kali_Don@gmail.com",
                                phone: "09563473486",
                                username: "HabenDogs",
                                datein: 20221128,
                                timein: "11:00 am",
                                numpeople: "3 People",
                                card: "mastercard",
                                cardnum: 8821938530493928,
                                resID: 4},

                                {restaurant: "Max's Restaurant",
                                name: "Nathalie Porter",
                                email: "Naliport@gmail.com",
                                phone: "09930390483",
                                username: "Chibog",
                                datein: 20221129,
                                timein: "11:00 pm",
                                numpeople: "2 People",
                                card: "paypal",
                                cardnum: 9472119239451923,
                                resID: 5}
                            ])
            comment.insertMany([
                                {
                                restaurant: "Gerry's Grill",
                                name: "Kali Don",
                                comment_text: "I love Gerry's Grill" },
                            
                            
                                {restaurant: "Max's Restaurant",
                                name: "Kali Don",
                                comment_text: "It's average. Meh!" },

                                {restaurant: "Kuya J",
                                name: "Miguel Alvorado",
                                comment_text: "This place is the best. Got the fastest reservation ever." },

                                {restaurant: "Gerry's Grill",
                                name: "Miguel Alvorado",
                                comment_text: "Sheeeesh! This place is lit." },

                                {restaurant: "Max's Restaurant",
                                name: "Nathalie Porter",
                                comment_text: "Best chicken in the country." },
                            ])

            counter.insertMany({reserveID: "resID", totalRes: 6})

            console.log("Sample Accounts are added!!");
        }
    })
})


module.exports =  {sampleData};
