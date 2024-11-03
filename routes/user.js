const router = require('express').Router();

const {updateUser} = require("../controllers/user");
const {updateUserValidation} = require("../validator/userValidator");
const authorized = require("../middleware/authorization")


router.route('/:id').patch(authorized(["admin"]),updateUserValidation(),updateUser);


module.exports = router;