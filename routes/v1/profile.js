const express = require('express');
router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome! You have been succesfully logged in as -' + req.user.fullname);
});

module.exports = router;