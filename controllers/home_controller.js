
const User = require('../models/user');
const Post = require('../models/post');

module.exports.home=async function(req,res){
    //get only posts data that is post and user id but not user data
    /*Post.find({}, function(err,posts){
        return res.render('home',{
            title : 'codeial | home',
            posts : posts,
        });
    });*/
    //populate post and coresponding user details like name pass and email
    //USING ASYNC AWAIT FUNCTION WITH ERROR HANDLING
    try{
        let posts = await Post.find({}).sort('-createdAt')
        .populate('user').populate({
            path: 'comments', 
            populate: {
                path: 'user'
            }
        })
        console.log(posts.user);
        let user = await User.find({})
        
        return res.render('home',{
            title : "codeials | home",
            posts : posts,
            all_users: user,
        })
    }
    catch(err){
        console.log("Error",err);
    }
}
module.exports.homepage=function(req,res){
    return res.end("<h1>Express controller home page is up and running</h1>")
}
