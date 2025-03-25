import { Document } from "mongoose";

export interface IGallery extends Document {
    title: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}