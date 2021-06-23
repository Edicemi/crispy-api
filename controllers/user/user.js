User = require('../../models/user.model');
const Error = require('../../lib/error')
const Book = require('../../models/book.model')

const fetchUsers = async(req, res) => {
    try {
        const id = req.params.id;
        // const { id } = req.body
        const userName = await User.findOne({ _id: id });

        // console.log(userName)
        if (userName._id.toString() !== req.decoded.user_id) {
            const error = Error("Un-authorized", 403);
            throw error;

        }
        const user = await User.findById(req.decoded.user_id).lean().populate("Books");

        if (!user) {
            const error = Error("User not found", 404);
            throw error;
        }
        res.status(200).json({
            message: "Fetched Successfully",
            user,
        });
    } catch (error) {
        console.log(error)
        return res.status(error.code).json({
            message: error.message,
            code: error.code,
        })
    }
}
module.exports = fetchUsers;