const router = require('express').Router();

const {loginController,registerController} = require("../controllers/auth")
const {userLoginValidation, userRegisterValidation} = require("../middleware/userValidator")
router.post("/login", userLoginValidation(),loginController)
router.post("/register", userRegisterValidation(),registerController)
module.exports = router;