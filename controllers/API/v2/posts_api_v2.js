module.exports.index = function(req,res){
    return res.json(200,
        {
            Message : "List of posts version_2",
            posts : [],
        })
}