const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user'); 
const res = require('express/lib/response');
passport.use(new GoogleStrategy({
    clientID : "1004625354223-rcgq0d3pb5lh051ifupqfdv2bqtjahsd.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:8000/user/auth/google/callback",
},function(accessToken, refreshToken, profile,done){
    User.findOne({email : profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("error getting session from google auth", err);
        }
        console.log(profile);
        if(user){
           return done(null, user);
        }
        else{
            User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex'),
            },function(err,user){
                if(err){
                    console.log("error in creating user google strategy",err);
                    return;
                }
                return done(null,user);
            })
        }
    })
}))