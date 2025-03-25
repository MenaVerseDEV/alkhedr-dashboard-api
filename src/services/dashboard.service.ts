import { handleFileUpload } from "../utils/upload";
import { IGallery } from "../interfaces/gallery.interface";
import Gallery from "../models/gallery.model";
import Car, { ICar } from "../models/car.model";
import Bank, { IBank } from "../models/bank.model";
import AppError from "../utils/appError";

export const AddImage = async(data:IGallery, file:any):Promise<IGallery> =>{
    const imageUrl:any = await handleFileUpload(file);
    console.log(imageUrl[0].value);
    const gallery = await Gallery.create({
        ...data, 
        imageUrl:imageUrl[0].value
    });
    if(!gallery){
        throw new AppError("Gallery not created", 400);
    }
    return gallery;
};

export const GetAllImages = async ():Promise<IGallery[]> =>{
    const gallery = await Gallery.find();
    if(!gallery){
        throw new AppError("No gallery found", 404);
    }
    return gallery;
};
export const GetImage = async (id:string):Promise<IGallery> =>{
    const gallery = await Gallery.findById(id);
    if(!gallery){
        throw new AppError("Gallery not found", 404);
    }
    return gallery;
}

export const DeleteImage = async (id:string):Promise<IGallery> =>{
    const gallery = await Gallery.findByIdAndDelete(id);
    if(!gallery){
        throw new AppError("Gallery not found", 404);
    }
    return gallery;
}
export const UpdateImage = async (id:string , data:IGallery , files:any):Promise<IGallery> =>{
    const imageUrl:any = await handleFileUpload(files);
    data.imageUrl = imageUrl[0].value;
    const gallery = await Gallery.findByIdAndUpdate(id, data, {new:true , runValidators:true});
    if(!gallery){
        throw new AppError("Gallery not found", 404);
    }
    return gallery;
}

export const GetAllCars = async ():Promise<ICar[]> =>{
    const cars = await Car.find();
    if(!cars){
        throw new AppError("No cars found", 404);
    }
    return cars;
}
export const GetAllBanks = async ():Promise<ICar[]> =>{
    const banks = await Bank.find();
    if(!banks){
        throw new AppError("No banks found", 404);
    }
    return banks;
}
export const CreateCar = async (data:ICar):Promise<ICar> =>{
    const cars = await Car.find();
    if(cars.find(car => car.name === data.name)){
        throw new AppError("Car already exists", 400);
    }
    const car = await Car.create(data);
    if(!car){
        throw new AppError("Car not created", 400);
    }
    return car;
}

export const CreateBank = async (data:IBank):Promise<IBank> =>{
    const banks = await Bank.find();
    if(banks.find(bank => bank.name === data.name)){
        throw new AppError("Bank already exists",400);
    }
    const bank = await Bank.create(data);
    if(!bank){
        throw new AppError("Bank not created", 400);
    }
    return bank;
}