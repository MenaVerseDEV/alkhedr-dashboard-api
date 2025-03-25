import asyncWrapper from "../middlewares/asyncWrapper";
import { Register , Login, GetAllEmployees, DeleteEmployee } from "../services/user.service";
import { Request, Response , NextFunction } from "express";
export const register = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const user = await Register(req.body);
    res.status(201).json({
        success:true,
        message:"User created successfully",
        data:{user}
    });
});

export const login = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const {email, password} = req.body;
    const {user, token} = await Login(email, password);
    res.status(200).json({
        success:true,
        message:"User logged in successfully",
        data:{user, token}
    });
})

export const getAllEmployees = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const employees = await GetAllEmployees();
    res.status(200).json({
        success:true,
        data:employees
    });
});

export const deleteUser = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const user = await DeleteEmployee(req.params.id);
    res.status(200).json({
        success:true,
        message:"User deleted successfully",
        data:user
    });
});