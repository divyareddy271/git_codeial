const express=require('express');

const { append } = require('express/lib/response');
const routes=express.Router();
const homeController=require('../controllers/home_controller');

console.log("Router loaded");
routes.get('/',homeController.home);
routes.get('/homepage',homeController.homepage);
routes.use('/user',require("./user"));
routes.use('/post',require('./post'));


module.exports=routes;