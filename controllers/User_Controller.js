const req = require('express/lib/request');
const User = require('../models/user');
module.exports.profile = function (req, res) {
   
        return res.render('profile',{
                    title:"Profile"//here contact is defined in Contact.find({},fun(,contact))
                })      
        
           
}
module.exports.user = function (req, res) {
    return res.render('user');
}
module.exports.signup = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up', {
        title: "User | Sign up"
    });
}
module.exports.signin = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in', {
        title: "User | sign in"
    });
}
//get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.Confirm_Password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.emial }, function (err, user) {
        if (err) {
            console.log("error in finding elements from db");
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log("errror!!!!", err.message);
                    return
                };
                return res.redirect('/user/signin');
            })
        }
        else {
            return res.redirect('back');
        }
    })
}
//sign in and create the session for the user
module.exports.create_session = function (req, res) {
    //Find the user
   return res.redirect('/');
}
//Signout 
module.exports.destroy_session = function (req, res) {
    req.logout();
   return res.redirect('/');
}