const express = require('express');
router = express.Router();

const { validateUserToken } = require('../../lib/jwt')
const { addBook } = require('../../controllers/user/book');

router.post('/addBook', validateUserToken, addBook);


module.exports = router;