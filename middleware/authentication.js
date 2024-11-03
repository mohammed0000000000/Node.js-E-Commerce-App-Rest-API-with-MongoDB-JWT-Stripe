const jwt  = require("jsonwebtoken");
const UnauthenticatedError = require("../errors/unauthenticatedError")

const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Authentication invalid");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.userInfo) {
            new UnauthenticatedError("Authentication invalid : Missing user info");
        }
        req.user = decoded;
        next();
    } catch (e) {
        throw new UnauthenticatedError("Authentication invalid")
    }
}

module.exports = authentication;