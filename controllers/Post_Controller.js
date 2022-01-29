const post = require("../models/posts");

module.exports.post=function(req,res){
    console.log("post controller");
    post.create({
        content : req.body.content,
        user : req.user._id
    },function(err,post){
        if (err) {
            console.log("errror!!!!", err.message);
            return
        };
    })
    return res.redirect('back');
}  
