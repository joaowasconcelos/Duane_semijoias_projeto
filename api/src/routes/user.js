import express from "express"
const routerUser = express.Router();

import { uploadImage } from "../config/firebaseStorage";

import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 }  // Limite de 1MB
});

routerUser.post('/postagens', Multer.single('imagem'), uploadImage);

export default routerUser;  