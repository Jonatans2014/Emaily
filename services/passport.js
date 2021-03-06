const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

//Mongoose Model Class.
const User = mongoose.model("users");

//call serilizerUser with the user to generate the indentifying piece of ingo

passport.serializeUser((user, done) => {
  //user.id generated by MongoDB
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//Services
//new instance of google Strategy
passport.use(
  new GoogleStrategy(
    {
      //import clientid and client secret from key.js
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("accessToken", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);

      //return a model or make a new one
      //check if ID already exist in MongoDB
      const existingUser = await User.findOne({ googleID: profile.id });
      {
        if (existingUser) {
          //do nothing

          //done with the authentication
          return done(null, existingUser);
        }
          //create an instance of User  .save into MONGODB
          const user = await new User({ googleID: profile.id }).save();
          done(null, user);
      }
    }
  )
);
