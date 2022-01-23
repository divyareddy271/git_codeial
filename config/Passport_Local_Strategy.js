const passport = require('passport');
const LOcalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
password.use(new LOcalStrategy({
    UsernameFiled: email
},
    function (email, password, done) {
        User.findOne({email:email},function(err,user){
            if(err){
                console.log("error in finding user");
                return done(err);
            }
            if(!user || user.passport != passport){
                return done(null,false);
            }
            return done(null,user);
        })
    }
));
passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(user,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user");
            return done(err); 
        }
        return done(null,user);
    })
})
module.exports=passport;