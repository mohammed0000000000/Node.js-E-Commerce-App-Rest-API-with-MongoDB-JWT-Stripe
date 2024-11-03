const {body} = require("express-validator")
const userRegisterValidation = ()=>
    [
        body('username').trim().notEmpty().withMessage("Username is required").isLength({min:3, max:20}).withMessage("username must be at least 3 chars"),
        body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("InValid Email"),
        body('password').trim().notEmpty().withMessage("Password is required").isLength({min:8}).withMessage("Password must be at least 8 characters"),
    ]

const userLoginValidation = ()=>[
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("InValid Email"),
    body("password").trim().notEmpty().withMessage("Password is required")
]
const updateUserValidation = () => [
    body('username').trim().notEmpty().withMessage("Username is required").isLength({min:3, max:20}).withMessage("username must be at least 3 chars"),
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("InValid Email"),
    body('password').trim().notEmpty().withMessage("Password is required").isLength({min:8}).withMessage("Password must be at least 8 characters"),
]
module.exports = {
    userRegisterValidation,
    userLoginValidation,
    updateUserValidation,
}