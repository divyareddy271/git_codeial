const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function(req,res){
//getting data from db all posts details
    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path : 'comments',
        populate:{
            path: 'user'
        }
    });
    return res.json(200,
        {
            Message : "List of posts",
            posts : posts,
        })
}
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){ 
            post.remove();
            let comment = await Comment.deleteMany({ post: req.params.id });
            return res.json(200,
                {
                    Message : "deleted post successfully",
    
                })
        }
        else{
            return res.json(401,{
                Message : "You cannot delete this post..!!",
            })
        }
       
    }
    catch(err){
        console.log(err);
        return res.json(500, "Internal server error!!");
    }
}