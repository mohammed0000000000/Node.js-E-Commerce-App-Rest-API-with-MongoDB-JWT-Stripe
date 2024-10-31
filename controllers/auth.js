const User = require('../models/User');
const {StatusCode} = require("http-status-codes")
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator")
const registerController = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {username, email, password} = req.body;
    const newUser = await User.create({username, email, password});
    return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        newUser,
    });
}

const loginController = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {email, password} = req.body;
    const user = await User.findOne({email}).exec();
    if(!user){
        return res.status(401).json({
            status: 'error',
            message: 'InValid Credentials',
        })
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if(!matchPassword){
        return res.status(401).json({
            status: 'error',
            message: 'InValid Credentials',
        })
    }
    return res.status(200).json({
        status: 'success',
        message:"Login Successfully",
    })
}

module.exports = {registerController, loginController}