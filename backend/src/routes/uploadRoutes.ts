import express, { Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { protect, admin } from '../middleware/auth';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'motomatch',
      allowedFormats: ['jpg', 'png', 'jpeg'],
      public_id: `${file.fieldname}-${Date.now()}`,
    };
  },
});

const upload = multer({ storage });

router.post('/', protect, (req: Request, res: Response, next: any) => {
  upload.single('image')(req, res, (err: any) => {
    if (err) {
      console.error('Multer/Cloudinary Error:', err);
      return res.status(400).json({ message: 'Image upload failed', error: err.message });
    }
    next();
  });
}, (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }
  
  res.send({
    message: 'Image uploaded to Cloudinary',
    image: (req.file as any).path, 
  });
});

export default router;
