const express = require("express");
const routes = express.Router();
const postsapiv2 = require('../../../controllers/API/v2/posts_api_v2');
routes.get('/',postsapiv2.index);
module.exports = routes;