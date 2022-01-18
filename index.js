const express=require("express");
const port=8000;
var expressLayouts = require('express-ejs-layouts');
var app=express();
//set up view engine
app.set('view engine','ejs');
app.use(expressLayouts);//this  is for layouts...place before route
app.set('views','./views');
//use express router routes/index
app.use('/',require('./routes/index'));//('/routes);
app.listen(port,function(err){
    if(err){
        console.log(`Error on port number:${port}`);
        return;
    }
    console.log(`SuccesSsfully runnning on port number:${port}`);
})