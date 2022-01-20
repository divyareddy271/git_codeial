const mongoose=require('mongoose');
mongoose.connect("mongodb://0.0.0.0:27017/codeial-development");
const db=mongoose.connection;
db.on('error',console.error.bind("ERRor"));
db.once('open',function(){
    console.log("Connected");
})
module.exports=db;