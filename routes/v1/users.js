const express = require('express');
router = express.Router();
const Register = require('../../controllers/user/register');
const Login = require('../../controllers/user/login');
const fetchUsers = require('../../controllers/user/user')
const { validateUserToken } = require('../../lib/jwt')
const passport = require("passport");



//authentication
router.post('/register', Register);
router.post('/login', Login);

//login
router.get('/login', (req, res) => {
    res.render('login');
});

//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//google
router.get('/google', passport.authenticate("google", {
    scope: ['profile']
}));

//callback route
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile/');
});


//users choice
router.get('/fetchUser/:id', validateUserToken, fetchUsers);


module.exports = router;