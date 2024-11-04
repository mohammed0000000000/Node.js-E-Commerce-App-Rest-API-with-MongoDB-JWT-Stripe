
const router = require('express').Router();
const authorized = require("../middleware/authorization")

const {remove,update, getAll, create, get} = require('../controllers/product');
router.route("/:id")
    .delete(authorized(["admin"]),remove)
    .patch(authorized(["admin"]),update)
    .get(get);

router.route("/").get(getAll).post(authorized(["admin"]),create);

module.exports = router;