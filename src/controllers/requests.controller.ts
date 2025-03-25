import asyncWrapper from '../middlewares/asyncWrapper';
import { CreateRequest , GetAllRequests , GetRequest, UpdateRequest, GetAllEmployeeRequests , AddEmployeeNote } from './../services/requests.service';
import { Request , Response , NextFunction } from 'express';

export const createRequest = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const request = await CreateRequest(req.body);
    res.status(201).json({
        success:true,
        data:request
    });
})

export const getAllRequests = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const requests = await GetAllRequests(req.user);
    res.status(200).json({
        success:true,
        data:requests
    });
});
export const getAllEmployeeRequests = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{    
    const requests = await GetAllEmployeeRequests(req.user?.id || '');
    res.status(200).json({
        success:true,
        data:requests
    });
})

export const getRequest = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const request = await GetRequest(req.params.reqId , req.user || '');
    res.status(200).json({
        success:true,
        data:request
    });
});

export const updateRequest = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const request = await UpdateRequest(req.params.reqId, req.body , req.user || ''); 
    res.status(200).json({
        success:true,
        data:request
    });
});

export const addEmployeeNote = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const request = await AddEmployeeNote(req.params.reqId, req.body.note , req.user || '');
    res.status(200).json({
        success:true,
        data:request
    });
});