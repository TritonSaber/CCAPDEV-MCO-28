
const account = require("../models/accountModel");
const reservation = require("../models/reservationModel");
const comment = require("../models/commentModel");
const like = require("../models/likeModel");
const restaurant = require("../models/restaurantModel");
const manager = require("../models/managerModel")
const counter = require("../models/counterModel");
const sampleData = ((req,res) =>{   
        
        
    account.findOne({username: "admin"}, function(err, accounts){
        if(!accounts){
            account.insertMany([{name: "admin", 
                                username: "admin",
                                bdate: 20021220,
                                phone: "09848873346",
                                email: "admin_bookNeat@gmail.com",
                                role: "Admin",
                                salt: process.env.ADMIN_SALT,
                                hash: process.env.ADMIN_HASH},
                                
                                {name: "Miguel Alvorado", 
                                username: "ImNo.1User",
                                bdate: 19991127,
                                phone: "09967541234",
                                email: "Miguel_Alvorado@gmail.com",
                                role: "User",
                                salt: process.env.IMNO1USER_SALT,
                                hash: process.env.IMNO1USER_HASH},

                                {name: "Kali Don", 
                                username: "HabenDogs",
                                bdate: 20010203,
                                phone: "09563473486",
                                email: "Kali_Don@gmail.com",
                                role: "User",
                                salt: process.env.HABENDOGS_SALT,
                                hash: process.env.HABENDOGS_HASH},
                                
                                {name: "Nathalie Porter", 
                                username: "Chibog",
                                bdate: 19980819,
                                phone: "09930390483",
                                email: "Naliport@gmail.com",
                                role: "User",
                                salt: process.env.CHIBOG_SALT,
                                hash: process.env.CHIBOG_HASH},

                                {name: "Chiz Escudero", 
                                username: "Tatsulok",
                                bdate: 19910423,
                                phone: "09345962837",
                                email: "Itsbamboog@gmail.com",
                                role: "Manager",
                                salt: process.env.TATSULOK_SALT,
                                hash: process.env.TATSULOK_HASH},

                                {name: "Dyis Jenkins", 
                                username: "meathead",
                                bdate: 19930625,
                                phone: "09949470483",
                                email: "leeroyjenkinsg@gmail.com",
                                role: "Manager",
                                salt: process.env.MEATHEAD_SALT,
                                hash: process.env.MEATHEAD_HASH},

                                {name: "Gabriel Cruz", 
                                username: "Gutomz",
                                bdate: 19991012,
                                phone: "09345962837",
                                email: "Gutomz@gmail.com",
                                role: "Manager",
                                salt: process.env.GUTOMZ_SALT,
                                hash: process.env.GUTOMZ_HASH},
                          
                                {name: "Roelle Rolder", 
                                username: "Rolling",
                                bdate: 20000214,
                                phone: "09020399381",
                                email: "Rollerg@gmail.com",
                                role: "Manager",
                                salt: process.env.ROLLING_SALT,
                                hash: process.env.ROLLING_HASH
                                },
               
                                {name: "Hannah Santos", 
                                username: "Player1",
                                bdate: 20000528,
                                phone: "09839387463",
                                email: "HsP1g@gmail.com",
                                role: "Manager",
                                salt: process.env.PLAYER1_SALT,
                                hash: process.env.PLAYER1_HASH},                    
                                ])

            manager.insertMany([{name: "Gabriel Cruz", 
                                username: "Gutomz",
                                email: "Gutomz@gmail.com",
                                phone:  "09345962837",
                                restaurant: "Gerry's Grill",
                                branch: "Makati",
                                restaurantID: 2,},

                                {name: "Dyis Jenkins", 
                                username: "meathead",
                                email: "leeroyjenkinsg@gmail.com",
                                phone:  "09949470483",
                                restaurant: "Max's Restaurant",
                                branch: "Makati",
                                restaurantID: 6,},

                                {name: "Chiz Escudero", 
                                username: "Tatsulok",
                                email: "Itsbamboog@gmail.com",
                                phone:  "09345962837",
                                restaurant: "Max's Restaurant",
                                branch: "Manila",
                                restaurantID: 5,},

                                {name: "Roelle Rolder", 
                                username: "Rolling",
                                email: "Rollerg@gmail.com",
                                phone:  "09020399381",
                                restaurant: "Kuya J",
                                branch: "Makati",
                                restaurantID: 4,},

                                {name: "Hannah Santos", 
                                username: "Player1",
                                email: "HsP1g@gmail.com",
                                phone:  "09839387463",
                                restaurant: "Kuya J",
                                branch: "Manila",
                                restaurantID: 3,},
                                ])
            

            reservation.insertMany([
                                {restaurant: "Gerry's Grill",
                                branch: "Makati",
                                name: "Miguel Alvorado",
                                email: "Miguel_Alvorado@gmail.com",
                                phone: "09848873346",
                                username: "ImNo.1User",
                                datein: 20221224,
                                timein: "6:00 pm",
                                numpeople: "2 People",
                                card: "visa",
                                cardnum: process.env.IMNO1USER_GERRYCARD,
                                resID: 1},

                                {restaurant: "Kuya J",
                                branch: "Makati",
                                name: "Miguel Alvorado",
                                email: "Miguel_Alvorado@gmail.com",
                                phone: "09848873346",
                                username: "ImNo.1User",
                                datein: 20221129,
                                timein: "1:00 pm",
                                numpeople: "4 People",
                                card: "mastercard",
                                cardnum: process.env.IMNO1USER_KUYAJCARD,
                                resID: 2},

                                {restaurant: "Kuya J",
                                branch: "Manila",
                                name: "Kali Don",
                                email: "Kali_Don@gmail.com",
                                phone: "09563473486",
                                username: "HabenDogs",
                                datein: 20221130,
                                timein: "12:00 pm",
                                numpeople: "6 People",
                                card: "paypal",
                                cardnum: process.env.HABENDOGS_KUYAJCARD,
                                resID: 3},


                                
                                {restaurant: "Max's Restaurant",
                                branch: "Makati",
                                name: "Kali Don",
                                email: "Kali_Don@gmail.com",
                                phone: "09563473486",
                                username: "HabenDogs",
                                datein: 20221128,
                                timein: "11:00 am",
                                numpeople: "3 People",
                                card: "mastercard",
                                cardnum: process.env.HABENDOGS_MAXCARD,
                                resID: 4},

                                {restaurant: "Max's Restaurant",
                                branch: "Manila",
                                name: "Nathalie Porter",
                                email: "Naliport@gmail.com",
                                phone: "09930390483",
                                username: "Chibog",
                                datein: 20221129,
                                timein: "11:00 pm",
                                numpeople: "2 People",
                                card: "paypal",
                                cardnum: process.env.CHIBOG_MAXCARD,
                                resID: 5}
                            ])
            comment.insertMany([
                                {
                                restaurant: "Gerry's Grill",
                                name: "Kali Don",
                                username: "HabenDogs",
                                restaurantID: 1,
                                comment_text: "I love Gerry's Grill"},
                            
                            
                                {restaurant: "Max's Restaurant",
                                name: "Kali Don",
                                username: "HabenDogs",
                                restaurantID: 5,
                                comment_text: "It's average. Meh!" },

                                {restaurant: "Kuya J",
                                name: "Miguel Alvorado",
                                username: "ImNo.1User",
                                restaurantID: 3,
                                comment_text: "This place is the best. Got the fastest reservation ever." },

                                {restaurant: "Gerry's Grill",
                                name: "Miguel Alvorado",
                                username: "ImNo.1User",
                                restaurantID: 4,
                                comment_text: "Sheeeesh! This place is lit." },

                                {restaurant: "Max's Restaurant",
                                name: "Nathalie Porter",
                                username: "Chibog",
                                restaurantID: 6,
                                comment_text: "Best chicken in the country." },
                            ])

            restaurant.insertMany([
                                {restaurantname: "Gerry's Grill", 
                                branch: "Manila",  
                                phone: 09988484711, 
                                restaurantID: 1
                                },

                                {restaurantname: "Gerry's Grill", 
                                branch: "Makati",  
                                phone: 0979030717, 
                                restaurantID: 2
                                },

                                {restaurantname: "Kuya J", 
                                branch: "Manila",  
                                phone: 09758418901, 
                                restaurantID: 3
                                },

                                {restaurantname: "Kuya J", 
                                branch: "Makati",  
                                phone: 09988495126, 
                                restaurantID: 4
                                },

                                {restaurantname: "Max's Restaurant", 
                                branch: "Manila",  
                                phone: 09677565112, 
                                restaurantID: 5
                                },

                                {restaurantname: "Max's Restaurant", 
                                branch: "Makati",  
                                phone: 09888121235,
                                restaurantID: 6
                                },
                            
                            
                            
                            ])

            counter.insertMany({reserveID: "resID", totalRes: 6})

            console.log("Sample Accounts are added!!");
        }
    })
    
})


module.exports =  {sampleData};
