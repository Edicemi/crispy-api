const jwt = require('jsonwebtoken');
const Error = require('../lib/error')

const jwtSign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY);
}

const jwtVerify = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return false;
    }
}

const validateUserToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        let result;
        if (authHeader) {
            const token = req.headers.authorization.split(' ')[1];
            result = jwtVerify(token);
            if (!result) {
                throw Error('Invaled bearer token', 404);
            } else {
                req.decoded = result;
                console.log("this is from the result", result)
                next();
            }
        } else {
            throw Error('Authorization Header is required', 404);
        }
    } catch (err) {
        return res.status(500).json({
            error: err
        });
    }
}



module.exports = { jwtSign, jwtVerify, validateUserToken }