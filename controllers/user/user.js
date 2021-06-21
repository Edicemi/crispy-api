User = require('../../models/user.model');
const Error = require('../../lib/error')
const Books = require('../../models/book.model')

const fetchUsers = async(req, res) => {
    try {
        const books = req.params.id;
        const userName = await User.findOne({ fullname: fullname });

        if (userName._id.toString() !== req.userId) {
            const error = Error("Un-authorized", 403);
            throw error;
        }
        const user = await User.findById(req.userId).lean().populate("Books");
        if (!user) {
            const error = Error("User not found", 404);
            throw error;
        }
        res.status(200).json({
            message: "Fetched Successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
}
module.exports = fetchUsers;