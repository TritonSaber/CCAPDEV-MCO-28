const express = require("express");

const path = require('path');
const multer  = require('multer')


const route = express.Router();


const controller = require("../controller/controller");



// use of multer for image
const storage = multer.diskStorage({
   destination:function(req,file,cb){
      cb(null,path.join(__dirname, '../public/userProfPics'));
   },

   filename:function(req,file,cb){
      const filename = file.originalname;
      cb(null,filename);
   }
});

const upload = multer({
   storage:storage, 
   fileFilter: (req, file, cb) => {
       if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
         cb(null, true);
       } else {
         cb(null, false);
         return cb(new Error('Only jpg, jpeg, and png are allowed! Please do not import other files.'));
       }
   }
   });

//Index
route.get('/', controller.getIndex);

route.get('/accountList', controller.getAccountList);

route.get('/managerList', controller.getManagerList);


route.get('/manager', controller.getIndexMngr);

//Get reservation of the user
route.get('/getreserve', controller.getReserve);

route.get('/add', controller.getBook);

route.post('/savereserve', controller.postReserve);

route.get('/register', controller.getRegister);

route.post('/saveaccount',controller.postSave);

route.get('/login', controller.getLogin);

route.get('/logout', controller.getLogout);

route.post('/postlogin', controller.postLogin);

route.post('/edit', controller.postEdit);

route.post('/delete', controller.postDelete);

route.post('/updatestatus', controller.updateStatus);

route.post('/deleteres', controller.deleteRes)

route.post('/manageChange', controller.postManage);


route.post('/postcomment', controller.postComment);

route.get('/getkuya', controller.getKuya);

route.get('/getgerry', controller.getGerry);

route.get('/getmax', controller.getMax);

route.get('/getprof', controller.getProf);

route.get('/getabout', controller.getAbout);

route.get('/getrefunds', controller.getRefunds);

route.get('/getpaymentmethods', controller.getPaymentM);

route.get('/getjoinus', controller.getJoinUs);

route.get('/getjoin', controller.getJoin);

// route.post('/postnewlike', controller.postNewLike);

route.get('/getlike', controller.getClickLike);

route.post('/postnewsletter', controller.postNewsletter);

route.get('/geteditprof', controller.getEdit);

route.post('/updateprofile', controller.postProfile);


module.exports =  route;
