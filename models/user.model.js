const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        reqired: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    books: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Books",
    } ],

    date:{
        type: String,
        enum:[mo, tues, we, the, fir, sat]
    }
}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema);