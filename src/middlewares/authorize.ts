import appError from "../utils/appError";

export default(...roles:any)=>{

    return (req:any,res:any,next:any)=>{
        const role = req.user.role;
        if(!roles.includes(role)){
            return next(new appError('Unauthorized', 401));
        }
        next();
    }
}