module.exports.home=function(req,res){
    return res.render('home');
}
module.exports.homepage=function(req,res){
    return res.end("<h1>Express controller home page is up and running</h1>")
}