import jwt from 'jsonwebtoken';
const generateToken = (payload:any) => {
    console.log(payload);
    
    return jwt.sign(payload, process?.env?.JWT_SECRET || 'Gamgom', {
        expiresIn: process.env.JWT_EXPIRE,
    });
}
export default generateToken;