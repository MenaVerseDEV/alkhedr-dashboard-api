"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization') || req.header('authorization');
    if (!authHeader) {
        res.status(401).json({ message: 'Authorization header is required.' });
        return;
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
        res.status(401).json({ message: 'Authorization header must be in the format "Bearer {token}".' });
        return;
    }
    const token = parts[1];
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in the environment variables.');
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.user = decoded;
        next();
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token.' });
        }
        else if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({ message: 'Token has expired.' });
        }
        else {
            console.error('Error verifying token:', err);
            res.status(500).json({ message: 'Internal server error during token verification.' });
        }
    }
};
exports.default = verifyToken;
