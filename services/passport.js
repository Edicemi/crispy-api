const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user.model");
const Error = require("../lib/error");

//cookiess
//grabbing information from the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//finding user based on id
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

require("dotenv").config();
passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      callbackURL: "/v1/users/google/redirect",
      clientID: process.env.CLIENTID,
      clientSecret: process.env.SECRET,
      //accessToken from google
    },
    (profile, done) => {
      //if user exists in db
      User.findOne({ googleId: profile.id }).then((userExist) => {
        try {
          if (userExist) {
            throw Error("user already exists", 500, userExist);
            done(null, userExist);
          } else {
            //if not create a new user
            // passport callback function
            console.log(profile);
            new User({
              fullname: profile.displayName,
              googleId: profile.id,
            })
              .save()
              .then((newUser) => {
                console.log("New user created: " + newUser);
                done(null, newUser);
              });
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  )
);
