const express = require('express');
router = express.Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        //i user is not logged in
        res.redirect('/v1/users/login');
    } else {
        //if logged in
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('profile', { user: req.user });
});

module.exports = router;