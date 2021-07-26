const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user.model');
const Error = require('../lib/error');
require('dotenv').config();

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

passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL: "/v1/users/google/redirect",
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret
            //accessToken from google
    }, (accessToken, refreshToken, profile, done) => {
        //if user exist in db
        User.findOne({ googleId: profile.id }).then((userExist) => {
            if (userExist) {
                console.log('User already exist:', userExist);
                done(null, userExist);
            } else {
                //create new user
                new User({
                    fullname: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.image.url
                }).save().then((newUser) => {
                    console.log('New user created:' + newUser);
                    done(null, newUser);
                })
            }
        });

    })
)