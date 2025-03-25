import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import {IUser, UserRole} from '../interfaces/user.interface';
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String , required: true, unique: true },
  password: { type: String, select: false, required: true },
  role: { type: String, enum: UserRole, default: UserRole.EMPLOYEE }
},{timestamps: true});
userSchema.methods.matchPassword = async function(enteredPassword:string){
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre<IUser>('save', async function(next){
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})
const User:Model<IUser> = model<IUser>('User', userSchema);
export default User;