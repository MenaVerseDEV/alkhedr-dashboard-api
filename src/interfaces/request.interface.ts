import { Document, Types } from "mongoose";
import { IUser } from "./user.interface";

export const enum RequestType {
    INDIVIDUAL_CASH = 'individual cash',
    INDIVIDUAL_FINANCE = 'idividual finance',
    COMPANY_FINANCE = 'company finance',
}
export enum RequestStatus {
    FINISHED = 'finished',
    UN_WATCHED = 'unwatched',
    WATCHED_UN_FINISHED = 'watched-un-finished',

}
export enum ResponseStatus {
    NOT_RESPONDED = 'not-responded',
    PHONE_CLOSED = 'phone-closed',
    INCORRECR_PHONE = 'incorrect-phone',
    FINISHED = 'finished',
    UN_AVAILABLE = 'un-available',
    REPEATED = 'repeated',
    NOT_STARTED = 'not-started',
    HIGH_COMMITMENT = 'high-commitment',
    LOW_COMMITMENT = 'low-commitment',
    NOT_CREDITWORTHY = 'not-creditworthy',
    NOT_SUTIABLE_SALARY = 'non-suitable-salary',
}
export interface IRequest extends Document {
    firstName: string;
    lastName: string;
    phone: string;
    carName: string;
    carsNumber?: number;
    city: string;
    area:string;
    totalIncome?: number;
    totalOutcome?: number;
    bankName?: string;
    note?: string;
    requestType:RequestType,
    user?: IUser;
    requestStatus?: RequestStatus;
    responseStatus?: ResponseStatus;
    lastReplyDate?: Date;
    createdAt:Date;
    updatedAt:Date;
    seenHistory?: Array<{seenDate:Date,seenBy:Types.ObjectId }>;
    actionHistory?: Array<{actionDate:Date,actionBy:Types.ObjectId,action:string }>;
    employeeNotes:Array<{
        note:string,
        noteBy:Types.ObjectId,
        noteDate:Date
    }>
}