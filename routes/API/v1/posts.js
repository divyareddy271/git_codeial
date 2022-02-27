const express = require('express');
const passport = require('passport');
const routes = express.Router();
const postapi = require("../../../controllers/API/v1/posts_api");
routes.get('/',postapi.index);
routes.delete('/:id',passport.authenticate('jwt', {session : false}),postapi.destroy);
module.exports = routes;