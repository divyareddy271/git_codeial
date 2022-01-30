const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.comment = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                comment: req.body.comment,
                user: req.user._id,
                post : req.body.post,
            }, function (err,comment) {
                if (err) {
                    console.log("errror!!!!", err.message);
                    return
                };
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            })
            
        }
       
    })
}
