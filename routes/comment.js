const express = require('express');
const routes = express.Router();
const commentcontroller = require('../controllers/comment_Controller');
routes.post('/comments', commentcontroller.comment);
module.exports = routes;