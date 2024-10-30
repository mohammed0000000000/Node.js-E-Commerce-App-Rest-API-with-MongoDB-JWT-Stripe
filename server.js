require('dotenv').config();
require("express-async-errors")

const path = require('path');

const mongoose = require('mongoose');

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001







mongoose.connection.once('open', () => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
        console.log('MongoDB Server is running on port', PORT);
    })
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})



