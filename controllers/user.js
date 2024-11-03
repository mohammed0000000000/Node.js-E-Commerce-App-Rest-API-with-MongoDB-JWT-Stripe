
const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const {validationResult} = require("express-validator")
const BadRequestError = require("../errors/badRequestError")
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

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const mongooseResponse = await User.deleteOne({_id: id});
    if (!mongooseResponse.deletedCount) {
        throw new BadRequestError("User Not Found")
    }
    return res.status(StatusCodes.OK).json({
        message: "User Delete Successfully",
    })
}

const getUser = async (req, res) =>{
    const id = req.params.id;
    const user = await User.findOne({_id: id});
    if (!user) {
        throw new BadRequestError("User Not Found")
    }
    return res.status(StatusCodes.OK).json({
        message: "User Found Successfully",
        user: user
    })
}
const getAllUser = async (req, res) =>{
    const users = await User.find({}).sort("createdAt");
res.status(StatusCodes.OK).json({
        message: users ?"Users Found Successfully" :"There is not users",
        users
    })
}
module.exports = {updateUser,deleteUser,getAllUser, getUser}