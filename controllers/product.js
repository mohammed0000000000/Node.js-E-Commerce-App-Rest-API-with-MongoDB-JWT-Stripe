
const Product = require("../models/Product");
const {StatusCodes} = require("http-status-codes");
const BadRequestError = require("../errors/badRequestError");
const create = async (req, res) => {
    const newProduct = await Product.create({...req.body});
    if (!newProduct)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Product not created"})
    res.status(StatusCodes.CREATED).json({message: "Product created successfully", product: newProduct});
}
/// ==>  /:id
const get = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product)
        throw BadRequestError("Product not found")
    return res.status(StatusCodes.OK).json({
        message: "Product found successfully",
        product
    });
}

const getAll = async (req, res) => {
    const {new: queryNew, category} = req.query;

    let products = [];
    if(queryNew){
        products = await Product.find({}).sort({createdAt: -1}).limit(5);
    }
    else if(category){
        products = await Product.find({
            categories:{
                $in: [category]
            }
        })
    }
    else products = await Product.find({});
    res.status(StatusCodes.OK).json({
        message: products ? "Products retrieved successfully" : "There is no products",
        products: products ?? []
    });
}
// ==> /id body{}
const update = async (req, res) => {
    const id = req.params.id
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
    if (!updatedProduct)
        throw BadRequestError("Product not found")
    res.status(StatusCodes.OK).json({
        message: "Product updated successfully",
        product: updatedProduct
    })
}
const remove = async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
        throw BadRequestError("Product not found")
    res.status(StatusCodes.OK).json({
        message: "Product deleted successfully",
        product: deletedProduct
    })
}
module.exports = {create,get, getAll, update, remove}