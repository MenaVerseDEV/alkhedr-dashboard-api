import { Types } from 'mongoose';
import Request from "../models/request.model";
import { IRequest, RequestStatus, ResponseStatus } from "../interfaces/request.interface";
import AppError from "../utils/appError";
import User from "../models/User.model";
export const CreateRequest = async(data:IRequest):Promise<IRequest> =>{
    const request = await Request.create({
        ...data, 
    });
    if(!request){
        throw new AppError("Request not created", 400);
    }
    return request;
};

export const UpdateRequest = async (id:string , data:IRequest , user:any):Promise<IRequest> =>{
    const request = await Request.findByIdAndUpdate(id, data, {new:true , runValidators:true}).populate("user").populate("seenHistory.seenBy actionHistory.actionBy employeeNotes.noteBy");
    if(!request){
        throw new AppError("Request not found", 404);
    }
    if(data.responseStatus && data.responseStatus  != ResponseStatus.NOT_STARTED){
        request.requestStatus = RequestStatus.FINISHED;
        request.actionHistory?.push({actionDate:new Date() , actionBy:user.id as Types.ObjectId, action:data.responseStatus });
    }
    await request.save();
    return await request.populate("seenHistory.seenBy actionHistory.actionBy employeeNotes.noteBy");
}
export const GetAllRequests = async (user?:any):Promise<IRequest[]> =>{
    let requests = await Request.find().populate("user").populate("seenHistory.seenBy actionHistory.actionBy employeeNotes.noteBy");
    if(!requests){
        throw new AppError("No requests found", 404);
    }
    return requests;
}
export const GetAllEmployeeRequests = async (employeeId:string):Promise<IRequest[]> =>{
    const requests = await Request.find({user:employeeId}).populate("user");
    if(!requests){
        throw new AppError("No requests found", 404);
    }
    return requests;
}
export const GetRequest = async (id:string , user:any):Promise<any> =>{
    const request = await Request.findById(id).populate("user").populate("seenHistory.seenBy actionHistory.actionBy employeeNotes.noteBy");
    let oldRequests = await Request.find({phone:request?.phone}).populate("user").populate("seenHistory.seenBy actionHistory.actionBy employeeNotes.noteBy");
    const uniqueRequests = new Set( [...oldRequests , request]);    
    if(!request){
        throw new AppError("Request not found", 404);
    }
    if( user.role =='employee' && !request?.user ){
        request.user = user.id;
        request.requestStatus = RequestStatus.WATCHED_UN_FINISHED;
    }    
    let existUser = request.seenHistory?.find((seen)=> seen.seenBy._id == user.id);
    if(!existUser){
        request.seenHistory?.push({seenDate:new Date() , seenBy: new Types.ObjectId(user.id) });
    }
    (await request.save()).populate("seenHistory.seenBy actionHistory.actionBy employeeNotes.noteBy");
    return {
        oldRequests:Array.from(uniqueRequests),
        request
    };
}

export const AddEmployeeNote = async (id:string , note:string , user:any):Promise<IRequest> =>{
    const request = await Request.findById(id);
    if(!request){
        throw new AppError("Request not found", 404);
    }
    request.employeeNotes.push({note, noteBy:user.id as Types.ObjectId, noteDate:new Date()});
    await request.save();
    return request;
}