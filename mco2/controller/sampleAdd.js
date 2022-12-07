
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
                                bdate: 20021220,
                                phone: "09848873346",
                                email: "admin_bookNeat@gmail.com",
                                role: "Admin",
                                salt: "16c9ebfb68415e9f294c7bcfaa8526805411b66e2d542a5924002282e6d4f7cb",
                                hash: "5a6df9d8475555b8d09ba27314760be7f073f17649316ad11efd1ff420f8dfe66d6bca44540accb649747aca1c5fd7fa1c605beda5df6581c018375ced1085328c35f1c648b4956f17cb61ed4893f717153963a6189044cfcec46daf2b4779480c233277f7f79f8a55856e37f5aa1ea27a7055072dc643f7b09cf73ff6de223f144cbaaf31350d5169d41d50611e2e9d2e66e332dc3cf1287f036e4531c906a03452055700480b6dac4401fd86469bcfff3421795b08056b851156aaf7e5703ef56f27d6e81114946531d11d06c3c52e4dac2e5aa354814ad53c3639bef497486dce1708d7a94e4d5f7db4fb54457678386e412e8b84c1bb74b8880ad4774418c41061737eb2667fbb92f265772ab6603284356733eb09e485fe81beed662ef825199d070821727e9e209bbe5faf5f1211c56bada9aed653d3d31383feb51c3ffb6692388e9236751a40bf9ff15149faf80e4fd63ea42899340bcdb0a99d8099e09cfe4ed2271ecca6243b1aefc3414dc41199ab5ef6dda308422552f76b73948fb767fea16140c149cd0aa98854ea725b2b5fa6b8b18824e4166114a84cdc44a50a634979a5d209b141f929c3873d4d2eeec6e87bbc2654c5852070967e3f8eb60aee1cf10e2f0ff026dc8b506b4c2c72173d1d0406d98c7ad1fd4a5b8868232d4a60287175758788570b21616f80e75cc7854d6cd71b3319622e7e72d92465"},
                                
                                {name: "Miguel Alvorado", 
                                username: "ImNo.1User",
                                bdate: 19991127,
                                phone: "09967541234",
                                email: "Miguel_Alvorado@gmail.com",
                                role: "User",
                                salt: "d4da25161caa7fccee9759ccbdd47b34d12852cd69b6db61fedbb191e65612ba",
                                hash: "d281087ec718760cab10c43100288a5bb6b9d6d2355d45c23f1822d0640fcaae0ec789b9ae7242f26fd8d0f1d66d6d673de547c38d5b3117d68e769f8cb2a3f8f610de595c0b8317e251074c7e9f5641468414cab8879c4eccbcde8fa7ee207957e527b1e5bd3a7505053a50176fb885a9f734cf0e1b773fdc04d810e8eb1eeacae3ceef94b2aa723ceacd776f962c9d9964963e13e714150ac19be0768a7c44715a6173b963f3a816e16f7952ead62be4fc4eb43cca9741c09d5fa0b26e18c995b0439391195f8c81daeeb11651c5e4b49ebee040f0146f78ebea39bc5610b7e2d61b5e4f8e79443cab4e25d378778e7bdb82419b888f5c42efac0883a2f476eae11b57926bd4e98afa88927f208106ae1558ebb7b6b4fcb2fbe0e9c2fdbb4bbf8294c975e0acd01ed9da8d3636eae412a810685ef1cafc327e0298832071dbf9f5624bc058a6eff916ada10d88cf0028ffccc438a700609091e9bfe168bf8ff3d2e27dfc10321d882f0cc4a6ce4a74039872d36834a3a691c9049813ecff4dbad32ba926e27131423ef69cf022d0b3020b18b5facc2289a6c4a8c6d5fef2a9da71d537a11b27259b5bcb82ccb9b1f1badffaedbec6b38535362e03e4504964bf6b5787089387da677da0bf9e0bb92b7e1c3a59fa4eea6b3adfd00602d1bc4c3eed0205bfb2a74f0391c533db63dcb3e9e8137fdf79f2c619d1edc9bab9d070"},

                                {name: "Kali Don", 
                                username: "HabenDogs",
                                bdate: 20010203,
                                phone: "09563473486",
                                email: "Kali_Don@gmail.com",
                                role: "User",
                                salt: "de039a39f6299367db03d01205c19d1b7cfecc7cea8a887e48ce70dbb136c7e7",
                                hash: "862458b0dfa184d9a2010dbfa3e7c98c5c73728ffe5a459bfa0126c4016181260a81ace5b8c74f7dad31453f156529f1434ab3167895fe8c6741559f90c087a369f7e74c9da5c24f2ee649f14daafaacefe9a5ee3f8d9da3d3791b2c65ea9d2846d46319efd7f8339f3a2436359c85bb59ae4e7bdc022731f7ad505c544e9f22b077fcd3fa0f26c62b2b5c5fce9b6152e8c4bf37332fba1e578ece80b5aa8140fe18ef39c059386b7d62a37953acbb24dca50f5edd509bb8d6f6e8e20d9356c4fd2910b532e1cc1b3d8b5f45ef1217b4cb53e5027f880d8f589f085b07d4277b4ceb46cdd63c709fb4c7f29d5af1b22701dbaa06888b4a32026f98ac53632a5219014e6789df4ec3caa8ff3ea61019af32680525e7d4c07980ba2aaf9c9099bcfe77a3850cfe73b39491a2e7d695e9181f293bbeb83af41ce740a31821504537d88021ecdbfc72fc697b362f43fa4905b34693d6fb6f2425a6257ba136fc682baeacf3bd1fbeefdc22605c8d1f33cb267ce3fe26ec9c61a3c27a693d41a0c2d8d321f9ec93e430a7cb23c3da18a42a655bc0ba655aee51e0bdd6eaccd80136d118d0b215c02cdbe0cd895fd7386ebc0f7a630e279673dd1a4d968fa2dc98fdecb18ee2acff9b218cf9b8061949279c90bf8c4d972957bc918c5fe9bd597429f65b4104223ce53c0bc0f7718911fad171e36c6048d29ed304a6fbf02aab8aec15"},
                                
                                {name: "Nathalie Porter", 
                                username: "Chibog",
                                bdate: 19980819,
                                phone: "09930390483",
                                email: "Naliport@gmail.com",
                                role: "User",
                                salt: "e81dc9c07288ba53658bf2bd1299cfe8b5343576a5c738fa7087b77e3cb29e7b",
                                hash: "74b7acd002ff65ac51c1e3928c7d41f40c591f18b5803ea231989b4f7c82f4014f6263e354b052fca787e8437624895c7477736670d71fcef2df00344a14819337e81349cc80a3851f5a8326c68fe12e963ccfbf3c8507dd546d996f9f76ef126aaa46997e3694f9bd3d122cc45beca7f6ee1f0c838c1455222d541dad06a67b2c21dde927bd4b524e524cf952e5e357b62f02a6ab35184118e26af303c7f2ff57b93f1267c8ad93dca5df444d3ae8c6c1945752254f3a5ad452ea9b891ad567331192253d5f3387c58feaf0420c40f659b5f637c2c680546783578c71a7a549023f0819d1d1157827831ede7e69776ed16c989cb9aafbe72424760bc1fceda1ac4485608ca968a9184eaeba7c3be6205bbf726eecdee0e287805cc812524be479b417dbf40447f83e0c81807d756fb28f69559f925800cc607694fc9bc9029c99e54ee460daeec0e284cd5c0ea76c7665f057a9fe281558b4b4b76df5f1a303523676033405657c2258ca27b69654b66bb3b501dbafaa33c5ba9fd275d696acba4e910cd584a9371c2a209e7688fe9661d4b7be82f6890da71f8851893a7ff698cc63997065da7fd7dc7d8dcdba90a106e9277bbb1b00d1f1d4174c43a36eaf2d48e9d709c83c8e6cf473cc3b25c5af44dbce00fed8ca43ae8df612b23f1dc7a551c438a0819d81e6c9bae304ec36763a4e55062fdac842991770c11bbe121f"},

                                {name: "Chiz Escudero", 
                                username: "Tatsulok",
                                password: "$2b$10$WhQXmcsISVHsdRrl4vbraeV7URe/TmSZBJ6tk8NajICDKmWzUt/I6",
                                bdate: 19910423,
                                phone: "09345962837",
                                email: "Itsbamboog@gmail.com",
                                role: "Manager",
                                salt: "b0651143ceeb21e9e402fbcdd439a8ff260e8ac9d965aff5d86fb3f451da104d",
                                hash: "ec54fd7b007e2de254a453dddd749c0b134dfee422f3ff0dc1b23189116ad0b61cd0ef8c0d1f2daff40d250364a96b8a5036fb9b218c904858ded8d0c035d6ca31381ae3a74436b3dec9dca7de4ded8aaa14e9d9732fe61f3b0769873da8b01505a086d5eaef1a335120c57eb23715f73d2b8cb91f4198ac4115a66dfc76c906ea5fbe28b7485e2a1c70a19373cbd6f402bfa326cbf8189590d01fddf10b46a8280210ab8879714a11a6c121c090b8d63dbf23cc2699e37fcfa68ba5ae340b688e422e95498b7c69bd9c0d5678f14154686c7972ab5af5ff4527b11804dbbaf22fabb96d9f8f5a695c1b1645af4c7df2b8cc1e52d342a3da01c090c2cd3fffa448fab7dc05276291c939115ba68d578a4e05795ad77b0f2a012efe7b318c41501ad6734fbcd572b8ef109d5fcf1dce0913b5171cbd400b624599c6d04d410ed29aa41a1043d3fee600c2d37272c5700ac86d23f8e3ccc5ce0537e01f5aec898dfe24f45e8e3fa8d93efa05c047a6dedf6c74a5e913dad26c8f8ea75e1ab4e05a1ce530ba3e5d518666292926f0c35bb478c9f20e5dbf480e8f1aba20326f63536280475fb5e50e4b55f0579507e2b5723992358bda5eef48b42f4a911b0b7cc33b142f310d17b3363fab130a925f2f6da18df45baf768af8a2d5571fa7bf52cfb990516463341eb3e42aa45b2c7ed09003102a3e669fa2095c33bb46c8ff3d13"},

                                {name: "Dyis Jenkins", 
                                username: "meathead",
                                bdate: 19930625,
                                phone: "09949470483",
                                email: "leeroyjenkinsg@gmail.com",
                                role: "Manager",
                                salt: "9b9351773664190682b002b401376213bba457fc39f7818e30d75409aca5d5a3",
                                hash: "bc0f3f23e0d22f7d7fb3b70578c8c8e1a0657f8b677e2a447356a14651ad9f9e953b6d5cf242697844552a7d8de31c99aec36d703517466aa0aa321dfa98d0fea31a94b8be0d79702daf94b035d01128221a6effa5682639f2e5cced576acc40991b937ad1bd212d6356b84c4719b94f61b96f7aa50c3587d88482754874c0ea5f242af4a9c2764b1841043f71aa3468605ac67895d5aec314bfdd04de0ba656aa8e242763056a58c710d788cb8acf0a2a6b92d3c0f25890e497cd8d0203ec64f51b0790c64a04490fa26e707a8d3579c185397071c443b2edd443c3ea8abd2dc08331c9b4c281154c680bb81ae9ec6eda2bcd59123d6859ae69beffe2045a4f04a8c1dd20b5849ef1dd0fd26635da44fc66fd258b6e7df0d8597c1c5d7054ef20741a420ba20634c044980881a34f25c4687075ceebc3de1b00713b674f7deedc3b91f896fd8c7133c7902e80263cd16cf2229c3b5f10f4de13870ddbfcb8a2af39933bf47a95130bc38bc20037f28c780d72f3442a17e12ab13edede47d915a4b7de5df489e607721b732dc2482bdda2d243f0a2374d7cd530ee533cf7de83e3ad98d136e1815526ed1c595d6315ddf3ca899b8694113f179d2c5480584b748a6f0ce673c0599b41d83865a6eb6d91dd44a603ba851173c7783cc5acfb9f9fdbc223e00e1d56d2b031eb82bba3dfb9ba45e2e022f6ae3313fd29ca9853268a"},

                                {name: "Gabriel Cruz", 
                                username: "Gutomz",
                                bdate: 19991012,
                                phone: "09345962837",
                                email: "Gutomz@gmail.com",
                                role: "Manager",
                                salt: "2dc75985512777daf9654ca7f593573daf9eec06a252a8fdcfafe6988922fceb",
                                hash: "721a53fb46715ef7a42d62cbb6aa62eeaa1c0a8aa1a59759a34e8ec5c9e604cc5bd2e897e054f2db7b8008a5cc1745bbd4885963cfba891ac6412c4a8a9ed283573b722ec3097bbd2efd32a4a69feea30d68d4d8ccf55ce844d4d8aa26dacc86777701178a8bb65e29a723292b68c0ca19918ebdeaf18701edf54d186931e1c343c08f97a61b6e9902e8766c06c8d8d1f81a820dc7f017570d9887134d712015a8c0e8143e435e5eb7f8d532dc05c08f0958c04dd1cce4b088c75b6cd2c73f624f44011da588c149c6eaa6cda48c861aef1f9609a47adb73359037241a9f006b67004a77db7c45b1a257f265fd3488d9a84b8f8063de8bdd852d9a4e340f3ce93cf61cb7e74eb49d2f75eb070469732b2ce551002fb27317c65e9c50349e1819b6618d5552292a4efb324a898ea9bca7ddeacaf2204ccc5d7dbf3809e6088c43e979e52a933d2718106fe807c2e64971a6e785e952730b5206e0e3a21e32afde2e5998c14c7e17b82a8901fd89040370b76d0641728b6ebd7388e7ae0a4830161e695645d108044b9e068477e46aec85262ceeb34a9b8429dead96d0e3a5615921271dedd1a13a30721201a0797f39e33bd2572737bf17827083b0a5442710cd4918e3796b3e47de32cf17c710dfe591878dc39d55539045226cc0f1878795387d8aaba69e32788f3916d330537a65d2ee1cd625f368b60f696364fc61809b8a"},
                          
                                {name: "Roelle Rolder", 
                                username: "Rolling",
                                bdate: 20000214,
                                phone: "09020399381",
                                email: "Rollerg@gmail.com",
                                role: "Manager",
                                salt: "1179b61329cd14a8fb6450f0fbad5837c686d37520312ebd8135694ddf21983c",
                                hash: "93fd52100e1d1faf5ca9cd26616c6d0baf0bf1e61be81acbdca0cd0a6259ec9364ac9aafd46d06ba1b037d4e6317b88552d5d99556ad50e65184642ddd828cb330567c1ab9a77e150f9658148b20f1475870a227ace0dfcc2a132d1460ef137c33bcd57f35ade10dc8e7c57c5bf1ccd426c84b508dc0803db41b32b74a7dbb32b573b1ce9cc64cc9e0ce32160463fdc48eb463cc523756f0bc3664411e828a61894cde1ee9d1799f959ae797d551a64b1b2cc26f758f1773dc3ced695ebbaeaadef18a6726a643822b374ca09c9e847e689f417ab4dcd3d7004c434aee477bc32d1c285b6e9d43b8fea17678264c48b36a1ce8ba5e8a6bc9c1a4cddb322c4e2933b248b55ce6e1b9844e20f6ce679b489202f833730752d4fb8a16117b74aede4c06da41343ae643aadff15ae92eed21684ac7495456802770cc4cf1d995f18c0b54e1d603ebf2814318b0bc6286e715fbcac6ebc1b94b95b3a435437a734566c76e8d66bd71927b0f8bef95a96dbfc55f157fa13784cfe5f5c130bd4d2de3165bc5f7ddf812a7fa11d69a5985d9d6c731e6c35ff88b26853bf0ad5fd1a91de94b8d96e2bb06dccfe97384eca29d8816cc40a7f5e3b5fbeece63aa147dc186814175bc5628f88b00560674ee51f64d4e4f0dca486fee1c65e7582adf27ef4ac46c762b8ce49fc09443d7ceae5e7ade3812c5d3d76fa3d06e86d52faebec70793"
                                },
               
                                {name: "Hannah Santos", 
                                username: "Player1",
                                password: "$2b$10$YXDUZD3b470eC3fLEAE4y.qpFG8UptOiQz9bCWOv95ICXGqS4K7vO",
                                bdate: 20000528,
                                phone: "09839387463",
                                email: "HsP1g@gmail.com",
                                role: "Manager",
                                salt: "688a52975c6e888faaa465ced24a0adc978bb7f798a490279baae1c297d0d6b7",
                                hash: "8b9b37f597ca019e58ff8db80fbf3e595e527249215747e2466b8c342c7e3107c98c5750100bd2006ea82241e95a540fcfc1852be7fbd5a59c4727cfca1049095aa64ebe24ecf343cfb2bf6122cbbc09476ba1597c0f2d5462f1a7ba5577dfaacdcfccf7f5b4ab451fe40dccfa905afc560fda5566cf3683e7678e6ea752f8eae860fd289caf8a52b681b5c1e1a55a73470920115a60439b2999fc912f9589be6c9561c84c933591003146adbeb00891b90e90a626f18d16631302dc98bdca981297148326c8f0725f073be5a1648933232e4a9c47a27ba4aa63c14d4d69c406570d49a16c5be89e6c6f3829b8e1ec999667884e71d92f3d8b6c2903c1451329b4fac2b3471b937ee18d2685b51e1f726650ad43568ee08527419e3c87ab87d83363cb8c021123c939d1f203d40f1a3b84593f3570599386b323c14059d90e3893c86f2bdeb44fc9c443eda2e06b7907b41c070cca4a1a283a19a9f58142b096ab057e42ee7c295057bf19a91a97402792927f09ef791ef861352340ab1f0498e0df9051fdde02a172ae93296b51adf6fe4c04604468a961e9251bcd345c25d3c384d7f127c27b803925802036122b774ec7678159b6befdcabab686f85d064f77f8ab304b191d7bb25bef65c57790f75fa97361a873b2f9d5014385880a97528024cc47346de6e0021288044a7c49257fd1d7447415fdfaf9c5e5723a00cf7e"},                    
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
