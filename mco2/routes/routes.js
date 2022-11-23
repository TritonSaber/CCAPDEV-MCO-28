const express = require("express");



const route = express.Router();


const controller = require("../controller/controller");

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

route.post('/saveaccount', controller.postSave)

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

route.get('/getedit', controller.getEdit);

route.post('/updateProfile', controller.postProfile);

module.exports =  route;
