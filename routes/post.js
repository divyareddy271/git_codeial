const express=require('express');
const passport = require('passport');
const routes=express.Router();
const postcontroller=require('../controllers/Post_Controller');
console.log("post route");
routes.post('/createposts',postcontroller.post);
routes.get('/destroy/:id',passport.checkauthentication,postcontroller.destroy);
module.exports=routes;