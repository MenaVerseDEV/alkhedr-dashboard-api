import {Schema , Model, model} from "mongoose";
import { IRequest, RequestStatus, ResponseStatus } from "../interfaces/request.interface";

const userSchema = new Schema<IRequest>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    carName: { type: String, required: true },
    carsNumber: { type: Number },
    city: { type: String, required: true },
    area: { type: String },
    totalIncome: { type: Number },
    totalOutcome: { type: Number },
    bankName: { type: String },
    note: { type: String },
    lastReplyDate: { type: Date },
    requestType: { type: String, required : true },
    requestStatus: { type: String , enum:RequestStatus , default:RequestStatus.UN_WATCHED },
    responseStatus: { type: String , enum:ResponseStatus , default:ResponseStatus.NOT_STARTED },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    seenHistory: [{
        _id: false,
        seenDate: { type: Date },
        seenBy: {
            type: Schema.Types.ObjectId, ref: 'User' 
        }
    }],
    actionHistory: [{
        _id: false,
        actionDate: { type: Date },
        actionBy: {type :Schema.Types.ObjectId, ref: 'User' },
        action: { type: String },
    }],
    employeeNotes :[{
        _id: false,
        note: { type: String },
        noteBy: { type: Schema.Types.ObjectId, ref: 'User' },
        noteDate: { type: Date }
    }]
},{timestamps: true});

const Request: Model<IRequest> = model('Request', userSchema);
export default Request;