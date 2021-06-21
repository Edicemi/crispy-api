const express = require('express');
router = express.Router();

const Register = require('../../controllers/user/register');
const Login = require('../../controllers/user/login');
const fetchUsers = require('../../controllers/user/user')
const { validateUserToken } = require('../../lib/jwt')



//authentication
router.post('/register', Register);
router.post('/login', Login);

//users choice
router.get('/fetchUser', validateUserToken, fetchUsers);


module.exports = router;