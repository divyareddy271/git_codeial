module.exports.home=function(req,res){
    console.log(req.cookies);
    return res.render('home');
}
module.exports.homepage=function(req,res){
    return res.end("<h1>Express controller home page is up and running</h1>")
}