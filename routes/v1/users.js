const express = require('express');
router = express.Router();
const Register = require('../../controllers/user/register');
const Login = require('../../controllers/user/login');
const fetchUsers = require('../../controllers/user/user')
const { validateUserToken } = require('../../lib/jwt')



//authentication
router.post('/register', Register);
router.post('/login', Login);

//login
router.get('/login', (req, res) => {
    res.render('login');
});

//logout
router.get('/logout', (req, res) => {
    res.send('Log Out')
})

//google
router.get('/google', (req, res) => {
    //passport
    res.send('Google login')
})

//users choice
router.get('/fetchUser/:id', validateUserToken, fetchUsers);


module.exports = router;