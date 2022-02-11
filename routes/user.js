const { Router } = require('express');
const express=require('express');
const routes=express.Router();
const passport=require('passport');
const userController=require('../controllers/User_Controller');
routes.get('/profile/:id',passport.checkauthentication,userController.profile);
routes.get('/',userController.user);
routes.get('/signup',userController.signup);
routes.get('/signin',userController.signin);
routes.post('/create',userController.create);
routes.post('/create_session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'},
), userController.create_session);
routes.get('/signout',userController.destroy_session);
routes.post('/update/:id',passport.checkauthentication,userController.update);
module.exports=routes;