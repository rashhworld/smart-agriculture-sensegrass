const jwt = require('jsonwebtoken');

// Middleware to validate JWT tokens and protect routes
module.exports = (req, res, next) => {
    try {
        // Check for Authorization header
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                status: "error",
                msg: "Authorization header not found"
            });
        }

        // Extract and verify token
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                status: "error",
                msg: "Auth token not found in Authorization header"
            });
        }

        // Decode token and attach user data to request
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        // Handle different types of JWT errors
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
