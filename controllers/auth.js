const User = require('../models/User');
const {StatusCodes} = require("http-status-codes")
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator")

const UnauthenticatedError = require("../errors/unauthenticatedError")
const registerController = async (req, res) => {
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
    console.log(User.schema)
    const newUser = await User.create({username, email, password});

    return res.status(StatusCodes.CREATED).json({
        status: 'success',
        message: 'User created successfully',
        newUser,
    });
}

const loginController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorList = []
        for (let error of errors.array()) {
            console.log(error)
            errorList.push(error.msg)
        }
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: errorList
        })
    }
    const {email, password} = req.body;
    const user = await User.findOne({email}).exec();
    if (!user) {
        throw new UnauthenticatedError("InValid Credentials!");
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        throw new UnauthenticatedError("InValid Credentials!");
    }
    return res.status(StatusCodes.OK).json({
        status: 'success',
        message: "Login Successfully",
    })
}

module.exports = {registerController, loginController}