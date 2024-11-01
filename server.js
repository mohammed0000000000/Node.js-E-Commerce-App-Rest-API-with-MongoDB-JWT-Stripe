require('dotenv').config();
require("express-async-errors")

const path = require('path');

const mongoose = require('mongoose');

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

const databaseConnection = require("./Database/DbConnection")

// Db Connection
databaseConnection();

// Middleware to handle JSON & URL - encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
const NotFoundMiddleware = require("./middleware/notFound")
const errorHandlerMiddleware = require("./middleware/errorHandler")
const mainRoute = require("./routes/index")
const authRoute = require("./routes/auth")
app.use("/api/v1",mainRoute)
app.use("/api/v1",authRoute)
app.use(NotFoundMiddleware);
app.use(errorHandlerMiddleware)


mongoose.connection.once('open', () => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
        console.log(`MongoDB Server is running on port : localhost:${PORT}`);
    })
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})



