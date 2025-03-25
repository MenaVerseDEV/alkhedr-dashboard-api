import {Model , Schema , model} from "mongoose";
import { IGallery } from "../interfaces/gallery.interface";
export const gallerySchema = new Schema<IGallery>({
    title: { type: String,  },
    description: { type: String, },
    imageUrl: { type: String, required: true },
},{timestamps: true});
const Gallery: Model<IGallery> = model('Gallery', gallerySchema);
export default Gallery;