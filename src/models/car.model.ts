import {Model, Schema , model} from 'mongoose';
export interface ICar {
    name: string;
}
const carSchema = new Schema<ICar>({
    name: { type: String, required: true },
},{timestamps: true});
const Car:Model<ICar> = model('Car', carSchema);
export default Car;