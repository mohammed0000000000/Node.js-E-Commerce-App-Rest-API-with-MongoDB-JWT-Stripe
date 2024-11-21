const Cart = require("../models/Cart");
const {StatusCodes} = require("http-status-codes");
const BadRequestError = require("../errors/badRequestError");
const create = async (req, res) => {
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    res.status(StatusCodes.CREATED).json(savedCart);
}
const update = async (req, res) => {
    const cartId = req.params.id;
    const updatedCart = await Cart.findByIdAndUpdate(cartId, req.body, {new: true});
    if (!updatedCart)
        throw new BadRequestError("Cart not found");
    res.status(StatusCodes.OK).json(updatedCart);
}

const remove = async(req, res) => {
    const cartId = req.params.id;
    const deletedCart = await Cart.findByIdAndDelete(cartId);
    if (!deletedCart){
        throw new BadRequestError("Cart not found");
    }
    res.status(StatusCodes.OK).json("Cart Deleted Successfully");
}
const get = async (req, res) =>{
    const userId = req.params.id;
    const cart = await Cart.findOne({userId: userId});
    if (!cart)
        throw new BadRequestError("Cart not found");
    res.status(StatusCodes.OK).json(cart);
}
const getAll = async (req, res) => {
    const carts = await Cart.find({});
    res.status(StatusCodes.OK).json(carts);
}
module.exports = {create, update, remove, get, getAll};