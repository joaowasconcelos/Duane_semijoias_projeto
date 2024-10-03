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
import PromocaoController from "../controllers/Promocao.js";
import PedidoController from "../controllers/Pedido.js";
import ProdutoFavController from "../controllers/Produto_fav.js";
import ProdutoController from "../controllers/Produto.js"


//Insert
routerUser.post("/CreateUser", CadastroUsuario.CadastroPessoa);
routerUser.post("/CreateCategoria",CategoriaController.Cadastro);
routerUser.post("/CreatePromocao",PromocaoController.Cadastro);
routerUser.post("/CreatePedido/:id",PedidoController.Cadastro);
routerUser.post("/CreatePedidoFav/:id",ProdutoFavController.Cadastro);
routerUser.post("/CreatePedido",PedidoController.Cadastro);
routerUser.post("/CreateProduto",ProdutoController.cadastro)

//Delete
routerUser.delete("/DeleteCategoria/:id",CategoriaController.Deletar);
routerUser.delete("/DeletePromocao/:id",PromocaoController.Deletar);
routerUser.delete("/DeletePedido/:id",PedidoController.Deletar);
routerUser.delete("/DeleteProdutoFav/:id",ProdutoFavController.Delete);

//Update
routerUser.put("/ModificaCategoria/:id",CategoriaController.Modifica);
routerUser.put("/ModificaPromocao/:id",PromocaoController.Modifica);
routerUser.put("/ModificaPedido/:id",PedidoController.Modifica);
routerUser.put("/ModificarProduto/:id",ProdutoController.editar)
routerUser.put("/ModificarPessoa/:id",CadastroUsuario.EditarPessoa)

//Select
routerUser.get("/SelecionaCategoria",CategoriaController.Seleciona);
routerUser.get("/SelecionaPromocao",PromocaoController.Seleciona);
routerUser.get("/SelecionaPedido",PedidoController.Seleciona);

export default routerUser;  

