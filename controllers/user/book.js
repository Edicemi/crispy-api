const Book = require('../../models/book.model');

const Error = require('../../lib/error')

const addBook = async(req, res) => {
    try {
        const { author, booktitle, comment } = req.body;
        const addbook = new Book({
            userId: req.decoded.user_id,
            author: author,
            booktitle: booktitle,
            comment: comment,
        });
        await addbook.save();
        return res.status(200).json({
            message: "Book added successfully"
        }, 201);
    } catch (error) {
        return res.status(error.code).json({
            message: error.message,
            code: error.code

        });
    }
}


module.exports = { addBook };