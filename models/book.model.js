const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    booktitle: {
        type: String,
        required: true,
    },
    comment: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    }
}, { timestamps: true });

module.exports = mongoose.model('Books', bookSchema)