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
    // await User.collection.dropIndex("username_1");
    const {username, email, password,role} = req.body;
    const newUser = await User.create({username, email, password,role});
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
    const matchPassword = await user.verifyPassword(password);
    if (!matchPassword) {
        throw new UnauthenticatedError("InValid Credentials!");
    }
    const token = await user.generateToken();
    res.cookie("jwt",token,{
        httpOnly: true,// accessible only by web server
        secure: true, // access by https in production
        sameSite: "None",// sameSite == None cookie send to domain and sub domain, if strict only the current site
        maxAge: 1000 * 60 * 60 * 24 * 7, //
    })
    return res.status(StatusCodes.OK).json({
        message: "Login Successfully",
        user:{username:user.username,role:user.role},
        token
    })
}
const refresh = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env['JWT_SECRET'], async (err, decoded) => {
        if (err) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden" });
        }
        const foundUser = await User.findById(decoded.userInfo.id).exec();

        if (!foundUser)
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Unauthorized" });

        const accessToken = jwt.sign(
            {
                userInfo: {
                    id: foundUser.id,
                },
            },
            process.env['JWT_SECRET'],
            { expiresIn: process.env['JWT_EXPIRE'] }
        );

        return res.status(StatusCodes.OK).json(accessToken);
    });
}
const logout = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    })
    return res.status(StatusCodes.OK).json({ message: "Logout Successful" });
};
module.exports = {registerController, loginController, refresh, logout}