const router = require('express').Router();

const {updateUser, deleteUser,getUser,getAllUser} = require("../controllers/user");
const {updateUserValidation} = require("../validator/userValidator");
const authorized = require("../middleware/authorization")


router.route('/:id').patch(authorized(["admin"]),updateUserValidation(),updateUser).
    delete(authorized(["admin"]),deleteUser)
    .get(getUser);
router.route("/").get(getAllUser);


module.exports = router;