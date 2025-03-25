import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    role:string;
    
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
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
    const decoded = jwt.verify(token, jwtSecret) as UserPayload;
    req.user = decoded;
    next();
    } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: 'Invalid token.' });
    } else if (err instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: 'Token has expired.' });
    } else {
        console.error('Error verifying token:', err);
        res.status(500).json({ message: 'Internal server error during token verification.' });
    }
}
};

export default verifyToken;

