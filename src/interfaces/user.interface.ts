import {Document} from 'mongoose';
export enum UserRole {
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
    MARKETER = 'marketer',
    SUPERADMIN = 'super-admin'
}
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    avatar?: string;
    password: string;
    requestsNumber?: number;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    matchPassword(enteredPassword:string):boolean;
}