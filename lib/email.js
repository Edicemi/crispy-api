const nodemailer = require('nodemailer');
require('dotenv').config();
const Error = require('../lib/error')
const { EMAIL_USER, EMAIL_PASS } = process.env;

exports.sendMail = async(msg, subject, receiver) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const info = await transporter.sendMail({
            from: 'victoriataiwo1998@gmail.com',
            subject: subject,
            html: msg,
            to: receiver
        });

        return `Message sent', ${nodemailer.getTestMessageUrl(info)}`;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};