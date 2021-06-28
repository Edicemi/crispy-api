const Book = require("../../models/book.model");

const Error = require("../../lib/error");

const addBook = async (req, res) => {
  console.log(req.decoded);
  try {
    const { author, booktitle, comment } = req.body;
    const addbook = new Book({
      userId: req.decoded.user_id,
      author: author,
      booktitle: booktitle,
      comment: comment,
    });
    const user = await User.findById(req.decoded.user_id);
    user.books.push(addbook);
    await user.save();
    await addbook.save();
    return res.status(200).json(
      {
        message: "Book added successfully",
      },
      201
    );
  } catch (error) {
    console.log(error);
    return res.status(error.code).json({
      message: error.message,
      code: error.code,
    });
  }
};

module.exports = { addBook };
