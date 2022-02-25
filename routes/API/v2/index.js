const express = require("express");
const routes = express.Router();

routes.use('/posts',require('./postsv2'));

module.exports = routes;