const router = require('express').Router();
const {paymentMethod} = require("../controllers/stripe");
router.route("/payments").post(paymentMethod);

module.exports = router;