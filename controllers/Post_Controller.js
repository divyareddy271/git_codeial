const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require('../models/user');

module.exports.post = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            let post = await Post.create({
                content: req.body.content,
                user: req.user._id,
            })
            if (req.xhr){
                // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
                post = await post.populate('user')
    
                return res.status(200).json({
                    data: {
                        post: post
                    },
                    message: "Post created!"
                });
            }
    
            req.flash('success', 'Post published!');
            return res.redirect('back');
        }
        else {
            req.flash("error","Can not create the post");
            return res.redirect('/user/signin');
        }
    }
    catch (err) {
        console.log("Error in post_controller create module", err);
    }
}
module.exports.destroy = async function (req, res) {
    try{
        let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
        post.remove();
        await Comment.deleteMany({ post: req.params.id });
        if(req.xhr){
            return res.status(200).json({
                data : {
                    post_id : req.params.id,
                },
                message : req.flash("success","deleted the post successfully"),
            })
        }
        return res.redirect("back");
    }
    else {
        return res.redirect('back');
    }
    }
    catch(err){
       req.flash("Error","Cannot delete the post");

    }
    
}
 /*  module.exports.destroy = function(req, res){
   Post.findById(req.params.id, function(err, post){
       // .id means converting the object id into string
       if (post.user == req.user.id){
           post.remove();

           Comment.deleteMany({post: req.params.id}, function(err){
               return res.redirect('back');
           });
       }else{
           return res.redirect('back');
       }

   });
}*/