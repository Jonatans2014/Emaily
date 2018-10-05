const express = require("express");
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const passport = require("passport");

require('./models/user'); 
require('./services/passport');




mongoose.connect(keys.mongoURI);
const app = express();

//BodyParser
app.use(bodyParser.json());

//add Cookies
app.use(
    cookieSession({

        maxAge: 30*24*60*60*1000,
        //encrynpt and sign cooke
        keys:[keys.cookieKey]
    })

);
app.use(passport.initialize());
app.use(passport.session());

//linking authroute.js to index.js
//Immediatle invoke app function
require("./routes/authRoutes")(app);
require('./routes/billingRoutes')(app);

// config for production in Heroku
if(process.env.NODE_ENV  === 'production')
{
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    // Express will server up the index.html file
    //file it does not recognize the route

    const path = require('path');
    app.get('*',(req,res) =>{

        res.sendFile(path.resolve(_dirname,'client,build,index.html'));
    });
}
//https://console.developers.google.com
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//install nodemon to update server everytime something is changed
