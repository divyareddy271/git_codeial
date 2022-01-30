const post = require("../models/post");
const comment = require("../models/comment");

module.exports.post = function (req, res) {
    if (req.isAuthenticated()) {
        post.create({
            content: req.body.content,
            user: req.user._id,
            
        }, function (err, post) {
            if (err) {
                console.log("errror!!!!", err.message);
                return
            };
        })
        return res.redirect('back');
    }
    return res.redirect('/user/signin');
}
