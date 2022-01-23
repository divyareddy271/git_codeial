const req = require('express/lib/request');
const user = require('../models/user');
const User = require('../models/user');
module.exports.profile = function (req, res) {
    if(req.cookies.user_id){
        user.findById(req.cookies.user_id,function(err,user){
            if(err){
                console.log("error in fetching data from db",err.message);
                return;
            }
            if(user){
                return res.render('profile',{
                    title:"Profile",user:user//here contact is defined in Contact.find({},fun(,contact))
                })      
            }
            else{
                return res.redirect('/user/signin');
            }
        })
    }
    else{
        return res.redirect('/user/signin');   
    }
}
module.exports.user = function (req, res) {
    return res.render('user');
}
module.exports.signup = function (req, res) {
    return res.render('user_sign_up', {
        title: "User | Sign up"
    });
}
module.exports.signin = function (req, res) {
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
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("Error cannot connect to db");
            return;
        }
        //handle the user found
        if (user){
        //handle password which doesnot match
            if (user.password != req.body.password) {
               
               console.log(user.password);
               console.log(req.body.password);
               return res.redirect('back');
            }
            //handle if session created
            else {
                res.cookie('user_id',user.id);
                console.log(res.cookies);
               return res.redirect('/user/profile');
              

                return res.redirect('/user/signup');
            }
        } 
    })
}
module.exports.signout= function (req, res) {
    res.clearCookie('user_id');
    console.log(req.cookies.user_id);
    return res.redirect("/user/signin");
}