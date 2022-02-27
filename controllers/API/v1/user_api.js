const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createsession = async function(req,res){
    try{
        let user = await User.findOne({email:req.query.email});
        if(!user || user.password != req.query.password){
            console.log(req.query);
            return res.json(422, {
                message : "invalid Username/Password..!! " 
            })
        }
        else{
            return res.json(200, {
                message : "Successfully logged in and here is the token",
                data : {
                    token : jwt.sign(JSON.stringify(user),'codeial')
                }
            })
        }
    }
    catch(err){
        console.log(err);
        return res.json(500, "Internal server error!!");
    }
    
}