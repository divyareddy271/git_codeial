const mongoose=require('mongoose');
//Multer required path and avatar
const multer = require('multer');
const path= require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');

const userschema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password: {
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    //defing avatar to store the path
    avatar : {
        type : String,
    }

},{
        timestamps:true
});
let storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",AVATAR_PATH));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now());
    }
})
userschema.statics.uploadedavatar = multer({storage:storage}).single('avatar');
userschema.statics.avatar_pathloc = AVATAR_PATH;
const user=mongoose.model('user',userschema);
module.exports=user;