const express=require("express");
const cookieParser=require('cookie-parser');
const port=8000;
var expressLayouts = require('express-ejs-layouts');
var app=express();
var db=require("./config/Mongoose.js");
const Details = require('./models/user');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/Passport_Local_Strategy');
//set up view engine
app.set('view engine','ejs');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);//this  is for layouts...place before route
app.set('views','./views');
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    name:'codeial',
    secret:'blansession',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge(1000 * 60 * 100);
    }
}));
app.use(express.static('./assets'));//to use static pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);//To use seperate links for each and every page
//use express router routes/index
app.use('/',require('./routes/index'));//('/routes);

app.listen(port,function(err){
    if(err){
        console.log(`Error on port number:${port}`);
        return;
    }
    console.log(`SuccesSsfully runnning on port number:${port}`);
})