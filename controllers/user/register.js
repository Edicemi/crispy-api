const path = require('path'),
    ejs = require('ejs'),
    User = require('../../models/user.model')

const Error = require('../../lib/error')
const { sendMail } = require('../../lib/email')
const { passwordHash } = require('../../lib/bcrypt')
const { jwtSign } = require('../../lib/jwt')

const Register = async(req, res) => {
    const { fullname, email, password, mobile, confirmpassword } = req.body
    try {
        if (fullname && email && password && mobile && confirmpassword) {
            let userExist = await User.findOne({ email: email })
            if (userExist) {
                throw Error(`Email ${email} already exist, try another one.`, 500)
            }
            if (confirmpassword !== password) {
                throw Error('Password does not match', 500)
            }
            const hashedPassword = await passwordHash(password)
            const user = new User({
                fullname: fullname,
                email: email,
                password: hashedPassword,
                mobile: mobile,
                confirmpassword: hashedPassword,
            })
            await user.save()
            ejs.renderFile(
                path.join(__dirname, '../../views/send_mail.ejs'), {
                    title: `Hello ${fullname}`,
                    body: 'Registration Message',
                },
                async(err, data) => {
                    await sendMail(data, 'Registration Successful', email)

                    let payload = {
                        fullname: user.fullname,
                        email: user.email,
                        mobile: user.mobile,
                    }
                    const token = jwtSign(payload)
                    return res.status(200).json({
                        message: 'User account created successfully',
                        data: payload,
                        token,
                    })
                },
            )
        } else {
            throw Error('Invalid parameters provided', 'MISSING ARGUMENTS', 419)
        }
    } catch (error) {
        console.log(error)
        return res.status(error.code).json({
            message: error.message,
            code: error.code,
        })
    }
}
module.exports = Register