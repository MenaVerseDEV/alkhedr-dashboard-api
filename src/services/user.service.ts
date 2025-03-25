import { RequestStatus } from "../interfaces/request.interface";
import { IUser } from "../interfaces/user.interface";
import Request from "../models/request.model";
import User from "../models/User.model";
import AppError from "../utils/appError";
import generateToken from "../utils/generateToken";

export const Register = async(data:IUser)=>{
    const user = await User.create({
        ...data, 
    });
    if(!user){
        throw new AppError("User not created", 400);
    }
    return {
        _id:user._id,
        __v:user.__v,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        phone:user.phone,
        role:user.role,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt
    };
}
export const Login = async(email:string, password:string)=>{
    const user = await User.findOne({email}).select("+password");
    if(!user){
        throw new AppError("User not found", 404);
    }
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        throw new AppError("Invalid credentials", 400);
    }
    const token = await generateToken({id:user._id , role:user.role , name:user.firstName});
    return {
        user:{
            _id:user._id,
            __v:user.__v,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            phone:user.phone,
            role:user.role,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt
        } , token
    }
}

export const GetAllEmployees = async()=>{
    let employees = await User.find({ role: { $in: ['employee', 'marketer'] } });
    const requests = await Request.find().populate("user");
    if(!employees){
        throw new AppError("No employees found", 404);
    }
    let result = employees.map((employee)=>{
        let userReq = requests.filter((request)=> request.user  && request.user._id == employee.id);        
        employee.requestsNumber = userReq.length || 0;
        let finished = userReq.filter((req)=> req.requestStatus == RequestStatus.FINISHED);
        let unWatched = userReq.filter((req)=> req.requestStatus == RequestStatus.UN_WATCHED);
        let watched = userReq.filter((req)=> req.requestStatus == RequestStatus.WATCHED_UN_FINISHED);
        return {
            employee,
            requestsNumber:userReq.length || 0,
            finished:finished.length || 0,
            unWatched:unWatched.length||0,
            watched:watched.length||0
        }
    })
    return result;
};

export const DeleteEmployee = async(id:string)=>{
    const user = await User.findByIdAndDelete(id);
    if(!user){
        throw new AppError("User not found", 404);
    }
    return user;
}