const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token; 

        if (!token) {
            return res.status(401).send("Please login");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; 
        next();
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = { authenticate };