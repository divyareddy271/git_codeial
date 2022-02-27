const express = require('express');
const routes = express.Router();
//const postapi = require("../../../controllers/API/v1/posts_api");
routes.use('/posts',require('./posts'));
routes.use('/user',require('./users'));
module.exports = routes;