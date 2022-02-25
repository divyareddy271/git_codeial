const express = require('express');
const routes = express.Router();
const postapi = require("../../../controllers/API/v1/posts_api");
routes.get('/',postapi.index);
module.exports = routes;