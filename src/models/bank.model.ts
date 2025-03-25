import {Model, Schema , model} from 'mongoose';
export interface IBank {
    name: string;
}
const bankSchema = new Schema<IBank>({
    name: { type: String, required: true },
},{timestamps: true});
const Bank:Model<IBank> = model('Bank', bankSchema);
export default Bank;