const router = require('express').Router();
const {get, getAll,create,update, remove} = require('../controllers/cart');
const authorized = require("../middleware/authorization")

router.route("/:id").get(get)
    .patch(update)
    .delete(remove);
router.route("/").get(authorized(['admin']),getAll)
    .post(create);

module.exports = router;