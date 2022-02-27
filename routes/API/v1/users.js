const express = require('express');
const routes = express.Router();
const userapi = require("../../../controllers/API/v1/user_api");
routes.post('/create-session',userapi.createsession);
module.exports = routes;