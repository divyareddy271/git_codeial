
const User = require('../models/user');
module.exports.profile = async function (req, res) {
    try {
        let user = await User.findById(req.params.id);
        return res.render('profile', {
            title: "Profile",
            profile_user: user,//here contact is defined in Contact.find({},fun(,contact))
        })
    }
    catch (err) {
        console.log("Error in user_controller profile module", err);
    }

}
module.exports.update = async function (req, res) {
    try {
        if (req.user.id == req.params.id) {
            let user = await User.findByIdAndUpdate(req.params.id, req.body)
            return res.redirect('back');
        }
        else {
            return res.staus(401).send('unauthorised');
        }
    }
    catch (err) {
        console.log("Error in user_controller update module", err);
    }
}
module.exports.user = function (req, res) {
    return res.render('user');
}
module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up', {
        title: "User | Sign up"
    });
}
module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in', {
        title: "User | sign in"
    });
}
//get the sign up data
module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.Confirm_Password) {
            return res.redirect('back');
        }
        let user = await User.findOne({ email: req.body.emial });
        if (!user) {
            await User.create(req.body);
                return res.redirect('/user/signin');
        }
        else {
            return res.redirect('back');
        }
    }
    catch (err) {
    console.log("Error in user_controller create module", err);
    }
}/*
//sign in and create the session for the user
module.exports.create_session = function (req, res) {
    //Find the user
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}
//Signout 
module.exports.destroy_session = function (req, res) {
    req.logout();
    req.flash('success', 'You have logged out!');
    console.log(req.flash);
    console.log(req.flash.success);
    return res.redirect('/user/signin');
}*/
module.exports.create_session = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroy_session = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}