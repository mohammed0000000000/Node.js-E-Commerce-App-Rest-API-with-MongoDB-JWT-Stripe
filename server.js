require('dotenv').config();
require("express-async-errors")

const path = require('path');

const mongoose = require('mongoose');

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

const cors = require("cors");

const databaseConnection = require("./Database/DbConnection")

/// Db Connection
databaseConnection();

/// Middleware to handle JSON & URL - encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

/// add cors
app.use(cors());
/// Middleware
const NotFoundMiddleware = require("./middleware/notFound")
const errorHandlerMiddleware = require("./middleware/errorHandler")
const authenticateMiddleware = require("./middleware/authentication")
/// routers
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const stripeRouter = require("./routes/stripe");


app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",authenticateMiddleware,userRouter);
app.use("/api/v1/product",authenticateMiddleware,productRouter);
app.use("/api/v1/cart", authenticateMiddleware, cartRouter);
app.use("/api/v1/order", authenticateMiddleware, orderRouter);
app.use("/api/v1/checkout", authenticateMiddleware, stripeRouter);
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



