import express from "express";
const routerUser = express.Router();

// import { uploadImage } from "../config/firebaseStorage.js";
// routerUser.post('/postagens', Multer.single('imagem'), uploadImage);
// import path from 'path';
// import { fileURLToPath } from 'url';
// import multer from 'multer';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const Multer = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 1024 * 1024 }  // Limite de 1MB
// });


import CadastroUsuario from "../controllers/CadastroUsuario.js";
import CategoriaController from "../controllers/Categoria.js";

routerUser.post("/CreateUser", CadastroUsuario.CadastroPessoa);

routerUser.post("/CreateCategoria",CategoriaController.Cadastro)
routerUser.delete("/DeleteCategoria/:id",CategoriaController.Deletar)
routerUser.put("/ModificaCategoria/:id",CategoriaController.Modifica)
routerUser.get("/SelecionaCategoria",CategoriaController.Seleciona)

export default routerUser;  

