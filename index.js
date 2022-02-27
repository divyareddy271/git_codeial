const express = require("express");
const cookieParser = require('cookie-parser');
const port = 8000;
var expressLayouts = require('express-ejs-layouts');
var app = express();
var db = require("./config/Mongoose");
const Details = require('./models/user');
const session = require('express-session');// used for session cookie
const passport = require('passport');
const passportLocal = require('./config/Passport_Local_Strategy');
const passportjwt = require('./config/Passport_jwt_strategy');
const passportgooglejwt = require('./config/passport_google_ouath2_strategy');
const MongoStore = require('connect-mongo');//(session);//rempove session in new version
const sass = require('node-sass');
const flash = require('connect-flash');
const customMware = require('./config/Middleware');


/*app.use(sass.middleware({
    src : './assets/scss',
    file : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}))
sass.render({
    file: './assets/css',
    outputStyle: 'extended',
    o/*
  }, function(err, result) {
    if(err) console.log('SASS error');
  
    // css to js
    pullCSS(String(result.css), constants.pathToCSSBuild);
  });
  */

//set up view engine
app.set('views', './views');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);//this  is for layouts...place before route

app.set('view engine', 'ejs');
app.use(express.static('./assets'));//to use static pages
app.use('/uploads',express.static(__dirname +'/uploads'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);//To use seperate links for each and every page'

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    //https://github.com/jdesboeufs/connect-mongo/blob/HEAD/MIGRATION_V4.md#v4-migration-guide
    store: MongoStore.create({
        mongoUrl : "mongodb://0.0.0.0:27017/codeial-development"
       
    },function(err){
        console.log(err || "connect-mongo setup is ok!!");
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setauthenticatedUser)
app.use(flash());
app.use(customMware.setFlash);
//use express router routes/index
app.use('/', require('./routes/index'));//('/routes);

app.listen(port, function (err) {
    if (err) {
        console.log(`Error on port number:${port}`);
        return;
    }
    console.log(`SuccesSsfully runnning on port number:${port}`);
})