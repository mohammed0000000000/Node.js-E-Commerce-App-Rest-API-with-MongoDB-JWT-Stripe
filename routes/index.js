const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) =>{
    res.send("Welcome Back Muhammed, from Node.js express");
})

module.exports = router;