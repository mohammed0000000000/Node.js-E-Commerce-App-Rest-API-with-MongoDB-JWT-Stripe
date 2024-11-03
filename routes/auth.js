const router = require('express').Router();

const {loginController,registerController, refresh, logout} = require("../controllers/auth")
const {userLoginValidation, userRegisterValidation} = require("../validator/userValidator")

router.post("/login", userLoginValidation(),loginController)
router.post("/register", userRegisterValidation(),registerController)
router.post("/refersh",refresh);
router.post("/logout", logout);


module.exports = router;