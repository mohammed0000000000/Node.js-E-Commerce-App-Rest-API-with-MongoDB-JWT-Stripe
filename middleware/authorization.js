const {StatusCodes}  = require("http-status-codes");
const authorized = (allowedRoles) => {
    return (req, res, next) => {
        // console.log(req.user);
        const {role} = req.user;
        if (allowedRoles.includes(role)) {
            next();
        } else {
            return res.status(StatusCodes.FORBIDDEN).json({
                message: "Not Allowed Operations"
            });
        }
    }
}
module.exports = authorized;