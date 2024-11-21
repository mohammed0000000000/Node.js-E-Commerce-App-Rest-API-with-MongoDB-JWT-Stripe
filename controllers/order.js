const Order = require("../models/Order");
const {StatusCodes} = require("http-status-codes");
const BadRequestError = require("../errors/badRequestError");
const Order = require("../models/Order");

const create = async (req, res) => {
    const newOrder = await Order.create({...req.body});
    if (!newOrder)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Order not created"})
    res.status(StatusCodes.CREATED).json({message: "Order created successfully", order: newOrder});
}
const update = async (req, res) => {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {new: true});
    if (!updatedOrder)
        throw new BadRequestError("Order not found");
    res.status(StatusCodes.OK).json(updatedOrder);
}

const remove = async(req, res) => {
    const id = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder){
        throw new BadRequestError("Order not found");
    }
    res.status(StatusCodes.OK).json("Order Deleted Successfully");
}
const get = async (req, res) =>{
    const userId = req.params.id;
    const orders = await Order.find({userId: userId});
    if (!orders)
        throw new BadRequestError("Order not found");
    res.status(StatusCodes.OK).json(orders);
}
const getAll = async (req, res) => {
    const carts = await Order.find({});
    res.status(StatusCodes.OK).json(carts);
}
// get monthly income
const income = async (req, res) => {
    const date = new Date();
    // Start of the current month
    const startOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    // Start and end of the previous month
    const startOfPreviousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const endOfPreviousMonth = new Date(startOfCurrentMonth - 1);

    // Aggregation pipeline
    const income = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth },
            },
        },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" },
            },
        },
    ]);

    res.status(StatusCodes.OK).json(income);
}
module.exports = {create, update, remove, get, getAll, income};