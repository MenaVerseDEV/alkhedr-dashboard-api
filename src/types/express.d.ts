import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      files?: Express.Multer.File[]; // Adjust this type based on your usage
    }
  }
}
