module.exports.profile=function(req,res){
    return res.end("<h1>Express user profile controller is up and running</h1>")
}
module.exports.user=function(req,res){
    return res.render('user');
}