import { AddImage , DeleteImage , GetAllImages, GetImage,UpdateImage , GetAllCars, GetAllBanks, CreateCar, CreateBank } from "../services/dashboard.service";
import { Request , Response , NextFunction } from 'express';
import asyncWrapper from '../middlewares/asyncWrapper';
export const addImage = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const image = await AddImage( req.body, req.files);
    res.status(201).json({
        success:true,
        data:image
    });
})

export const getAllImages = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const images = await GetAllImages();
    res.status(200).json({
        success:true,
        data:images
    });
});

export const getImage = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const image = await GetImage(req.params.id);
    res.status(200).json({
        success:true,
        data:image
    });
});

export const deleteImage = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const image = await DeleteImage(req.params.id);
    res.status(200).json({
        success:true,
        data:image
    });
});

export const updateImage = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const image = await UpdateImage(req.params.id, req.body, req.files);
    res.status(200).json({
        success:true,
        data:image
    });
});

export const getAllCars = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const cars = await GetAllCars();
    res.status(200).json({
        success:true,
        data:cars
    });
})

export const getAllBanks = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const banks = await GetAllBanks();
    res.status(200).json({
        success:true,
        data:banks
    });
})

export const createCar = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const car = await CreateCar(req.body);
    res.status(201).json({
        success:true,
        data:car
    });
});

export const createBank = asyncWrapper(async(req:Request, res:Response, next:NextFunction)=>{
    const bank = await CreateBank(req.body);
    res.status(201).json({
        success:true,
        data:bank
    });
})