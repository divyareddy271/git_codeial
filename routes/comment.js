const express = require('express');
const passport = require('passport');
const routes = express.Router();
const commentcontroller = require('../controllers/comment_Controller');
routes.post('/comments', commentcontroller.comment);
routes.get('/destroy/:id',passport.checkauthentication,commentcontroller.destroy);
module.exports = routes;