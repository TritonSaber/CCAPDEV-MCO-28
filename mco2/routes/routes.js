const express = require("express");



const route = express.Router();


const controller = require("../controller/controller");

//Index
route.get('/', controller.getIndex);

//Get reservation of the user
route.get('/getreserve', controller.getReserve);

route.get('/add', controller.getBook);

route.post('/savereserve', controller.postReserve);

route.get('/register', controller.getRegister);

route.post('/saveaccount', controller.postSave)

route.get('/login', controller.getLogin);

route.get('/logout', controller.getLogout);

route.post('/postlogin', controller.postLogin);

route.post('/postcomment', controller.postComment);

// route.get('/getcomment', controller.getComment);

route.get('/getkuya', controller.getKuya);

route.get('/getgerry', controller.getGerry);

route.get('/getmax', controller.getMax);

module.exports =  route;
