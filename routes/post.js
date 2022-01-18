const express=require('express');
const routes=express.Router();
const postcontroller=require('../controllers/Post_Controller');
routes.get('/',postcontroller.post);
module.exports=routes;