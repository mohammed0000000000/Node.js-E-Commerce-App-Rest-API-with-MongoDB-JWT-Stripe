
const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const {validationResult} = require("express-validator")

const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorList = []
        for (let error of errors.array()) {
            errorList.push(error.msg)
        }
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorList
        })
    }
    const {username, email, password} = req.body;
    const mongooseResponse = await User.updateOne({email:email}, {password});
    if (mongooseResponse.modifiedCount || mongooseResponse.matchedCount) {
        return res.status(StatusCodes.OK).json({
            message: "User updated successfully",
        })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:"Operation Failed"
    })
}


module.exports = {updateUser}