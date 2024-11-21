const Stripe  = require("stripe");
const {StatusCodes} = require("http-status-codes");
const BadRequestError = require("../errors/badRequestError");

const stripe = Stripe(process.env['STRIPE_KEY ']);

const paymentMethod = async (req, res) => {
    // Extract and validate request body
    const { tokenId, amount, currency } = req.body;

    if (!tokenId || !amount || !currency) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: "Missing required fields: tokenId, amount, or currency.",
        });
    }

    // Ensure amount is valid (non-negative and properly formatted)
    if (isNaN(amount) || amount <= 0) {
        throw  BadRequestError("Invalid amount")
    }

    // Create a charge
    const customerPayment = await stripe.charges.create({
        source: tokenId,
        amount: Math.round(amount * 100), // Convert to smallest currency unit
        currency: currency.toLowerCase(), // Ensure lowercase currency code
    });

    res.status(StatusCodes.OK).json({
        message: "Payment processed successfully.",
        payment: customerPayment,
    });
}
module.exports = {paymentMethod}