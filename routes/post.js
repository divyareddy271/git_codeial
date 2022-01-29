const express=require('express');
const routes=express.Router();
const postcontroller=require('../controllers/Post_Controller');
console.log("post route");
routes.post('/createposts',postcontroller.post);
module.exports=routes;