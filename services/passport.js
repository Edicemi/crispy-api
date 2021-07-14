const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user.model');
const Error = require('../lib/error');
require('dotenv').config();
passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL: "/v1/users/google/redirect",
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret
            //accessToken from google
    }, (accessToken, refreshToken, profile, done) => {
        //if user exists in db
        User.findOne({ googleId: profile.id }).then((userExist) => {
            try {
                if (userExist) {
                    throw Error("user already exists, try another.", 500)
                } else {
                    //if not create a new user
                    // passport callback function
                    console.log(profile);
                    new User({
                        fullname: profile.displayName,
                        googleId: profile.id
                    }).save().then((newUser) => {
                        console.log('New user created: ' + newUser)
                    });
                }
            } catch (error) {
                console.log(error)

            }
        })

    }));