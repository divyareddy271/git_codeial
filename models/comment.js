const mongoose=require("mongoose");
const commmentSchema = new mongoose.Schema({
    comment : {
        type : String,
        require : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'post'
    },
},{
    timestamps :true
});
const Comment= mongoose.model("Comment",commmentSchema);
module.exports = Comment;