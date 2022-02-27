const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
////module to extract header from jwt
const extractJWT = require('passport-jwt').ExtractJwt;
//user deatils
const User = require("../models/user");
//how to encrypt key and used secret key
let opts = {
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial',
}
passport.use(new JwtStrategy(opts, function (jwtpayloads, done) {
    User.findById(jwtpayloads._id, function(err, user){
        if(err) {
            console.log("error in finding user from JWT");
            return;
        }
        if(user) {
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}))
module.exports = passport;