const { Router } = require('express');
const express=require('express');
const routes=express.Router();
const passport=require('passport');
const { route } = require('.');
const userController=require('../controllers/User_Controller');
const user = require('../models/user');
routes.get('/profile/:id',passport.checkauthentication,userController.profile);
routes.get('/',userController.user);
routes.get('/signup',userController.signup);
routes.get('/signin',userController.signin);
routes.get('/auth/google',passport.authenticate('google',{scope :["profile", "email"]}));
routes.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect : '/user/signin'
}),userController.create_session);
routes.post('/create',userController.create);
routes.post('/create_session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'},
), userController.create_session);
routes.get('/signout',userController.destroy_session);
routes.post('/update/:id',passport.checkauthentication,userController.update);

module.exports=routes;