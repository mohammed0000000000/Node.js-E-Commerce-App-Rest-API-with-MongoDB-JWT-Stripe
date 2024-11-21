const router = require('express').Router();
const {get, getAll,create,update, remove, income} = require('../controllers/order');
const authorized = require("../middleware/authorization")

router.route("/:id").get(get)
    .patch(update)
    .delete(remove);
router.route("/").get(authorized(['admin']),getAll)
    .post(create);
router.route("/income").get(authorized(['admin']),income);

module.exports = router;