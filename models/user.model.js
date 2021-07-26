const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,

    },
    email: {
        type: String,
        reqired: true,
    },
    // mobile: {
    //     type: String,
    //     required: true,
    // },
    googleId: {
        type: String,
    },
    thumbnail: {
        type: String
    },
    // password: {
    //     type: String,
    //     required: true,
    // },
    books: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Books",
    }],

}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema);