const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();
// const keys = require('./keys')
passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      callbackURL: "/auth/google/redirect",
      clientID: process.env.CLIENTID,
      clientSecret: process.env.SECRET,
    },
    () => {
      // passport callback function
    }
  )
);
