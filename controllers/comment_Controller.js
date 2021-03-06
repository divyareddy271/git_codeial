const { localsName } = require("ejs");
const { redirect } = require("express/lib/response");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.comment = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                comment: req.body.comment,
                user: req.user._id,
                post: req.body.post,
            })
            post.comments.push(comment);
            post.save();
            req.flash("success","Added comment successfully");
            return res.redirect('back');
        }
    }
    catch (err) {
        req.flash("error","Error in adding the comment");
    }
}
module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        let post =  await Post.findById(comment.post);
        console.log(comment.post,req.user.id,post.user);
        if (comment.user == req.user.id  || req.user.id == post.user) {
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            req.flash("success","Deleted comment successfully");
            return res.redirect('back');
        } else {
           // console.log("not match",req.user.id,post.user);
            return res.redirect('back');
        }
    }
    catch (err) {
        req.flash("error","Error in deleting the comment");
    }

}
