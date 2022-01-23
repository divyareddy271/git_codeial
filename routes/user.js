const express=require('express');
const routes=express.Router();

const userController=require('../controllers/User_Controller');
routes.get('/profile',userController.profile);
routes.get('/',userController.user);
routes.get('/signup',userController.signup);
routes.get('/signin',userController.signin);
routes.post('/create',userController.create);
routes.post('/create_session',userController.create_session); 
routes.get('/signout',userController.signout);
module.exports=routes;