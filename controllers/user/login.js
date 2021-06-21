User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const { passwordCompare } = require('../../lib/bcrypt');
const Error = require('../../lib/error')
const { jwtSign } = require('../../lib/jwt')

const Login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const doMatch = await passwordCompare(password, user.password);
            console.log(user)
            if (doMatch) {
                let payload = {
                    user_id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    mobile: user.mobile
                };
                const token = jwtSign(payload);
                return res.status(200).json({
                    message: 'User logged in successfully',
                    data: payload,
                    token,
                });
            } else {
                throw Error('Invalid email or password',
                    410);
            }
        } else {
            throw Error('Invalid email or password', 410);
        }
    } catch (error) {
        console.log(error)
        return res.status(error.code).json({
            message: error.message,
            code: error.code,

        });
    };
}
module.exports = Login