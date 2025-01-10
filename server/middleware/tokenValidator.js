const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                status: "error",
                msg: "Authorization header not found"
            });
        }

        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                status: "error",
                msg: "Auth token not found in Authorization header"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                status: "error",
                msg: "Invalid auth token",
                error: error.message
            });
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                status: "error",
                msg: "Auth token has expired",
                error: error.message
            });
        }

        res.status(401).json({
            status: "error",
            msg: "Authentication failed",
            error: error.message
        });
    }
};
