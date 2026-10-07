const jwt = require("jsonwebtoken");


// Authentication middleware
function authMiddleware(req, res, next) {

    try {

        // Get Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Access denied. Please login first."
            });
        }


        // Expected format:
        // Bearer TOKEN

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Access denied. Token missing."
            });
        }


        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Store user ID in request
        req.userId = decoded.userId;


        // Continue to the next route
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }
}


module.exports = authMiddleware;