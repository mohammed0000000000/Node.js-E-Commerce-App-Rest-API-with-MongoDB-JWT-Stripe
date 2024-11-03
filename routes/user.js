const router = require('express').Router();

const {updateUser} = require("../controllers/user");
const authorized = require("../middleware/authorization")
router.route('/:id').patch(authorized(["admin"]),updateUser);
module.exports = router;