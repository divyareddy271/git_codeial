const mongoose=require('mongoose');
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

},{
        timestamps:true
});
const user=mongoose.model('user',userschema);
module.exports=user;