import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Access Denied! No token provided",
            success: false
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({
                message: "Access Denied! Invalid token provided",
                success: false
            });
        }
        req.userID = verified.userID; // This is the user ID from the token
    } catch (error) {
        
        res.status(500).json({
            message: error.message,
            success: false
        });
    }

 }