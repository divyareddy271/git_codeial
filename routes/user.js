const express=require('express');
const routes=express.Router();

const userController=require('../controllers/User_Controller');
routes.get('/profile',userController.profile);
routes.get('/',userController.user);
module.exports=routes;