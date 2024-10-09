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

import authenticateJWT from "../middleware/authenticateJWT.js";
import authenticatePerfil from "../middleware/authenticatePerfil.js";
import CadastroUsuario from "../controllers/CadastroUsuario.js";
import CategoriaController from "../controllers/Categoria.js";
import PromocaoController from "../controllers/Promocao.js";
import PedidoController from "../controllers/Pedido.js";
import ProdutoFavController from "../controllers/Produto_fav.js";
import ProdutoController from "../controllers/Produto.js";
import LoginController from "../controllers/Login.js";
import CadastroADM from "../controllers/CadastroADM.js"
import CuponsController from "../controllers/Cupons.js";

//Insert
routerUser.post("/CreateUser",CadastroUsuario.CadastroPessoa);
routerUser.post("/CreateCategoria",authenticateJWT,authenticatePerfil,CategoriaController.Cadastro);
routerUser.post("/CreatePromocao",authenticateJWT,authenticatePerfil,PromocaoController.Cadastro);
routerUser.post("/CreatePedido/:id",authenticateJWT,PedidoController.Cadastro);//trocar para o JWT
routerUser.post("/CreatePedidoFav/:id",authenticateJWT,ProdutoFavController.Cadastro);//trocar para o JWT
routerUser.post("/CreateProduto",authenticateJWT,authenticatePerfil,ProdutoController.cadastro)
routerUser.post("/CreateADM",authenticateJWT,authenticatePerfil,CadastroADM.CadastroPessoaADM);
routerUser.post("/CreateCupom",authenticateJWT,authenticatePerfil,CuponsController.CreateCupons)

//Delete
// routerUser.delete("/DeleteCategoria/:id",authenticateJWT,authenticatePerfil,CategoriaController.Deletar);
// routerUser.delete("/DeletePromocao/:id",authenticateJWT,authenticatePerfil,PromocaoController.Deletar);
// routerUser.delete("/DeletePedido/:id",authenticateJWT,authenticatePerfil,PedidoController.Deletar);
// routerUser.delete("/DeleteProdutoFav/:id",authenticateJWT,authenticatePerfil,ProdutoFavController.Delete);
// routerUser.delete("/DeleteUser/:id",authenticateJWT,authenticatePerfil,CadastroADM.ExcluirPessoa)// ADM
// routerUser.delete("/DeleteUser/:id",authenticateJWT,authenticatePerfil,CadastroUsuario.ExcluirPessoa);

//Update
routerUser.put("/ModificaCategoria/:id",authenticateJWT,authenticatePerfil,CategoriaController.Modifica);
routerUser.put("/ModificaPromocao/:id",authenticateJWT,authenticatePerfil,PromocaoController.Modifica);
routerUser.put("/ModificaPedido/:id",authenticateJWT,authenticatePerfil,PedidoController.Modifica);
routerUser.put("/ModificarProduto/:id",authenticateJWT,authenticatePerfil,ProdutoController.editar)
routerUser.put("/ModificarPessoa/:id",CadastroUsuario.EditarPessoa)
routerUser.put("/InativarConta",authenticateJWT,LoginController.Inativar)
routerUser.put("/AtivarConta",authenticateJWT,LoginController.Ativar)
routerUser.put("/ModificaCupom/:id",authenticateJWT,authenticatePerfil,CuponsController.Edita);


//Select
routerUser.get("/SelecionaCategoria",authenticateJWT,authenticatePerfil,CategoriaController.Seleciona);
routerUser.get("/SelecionaPromocao",authenticateJWT,PromocaoController.Seleciona);
routerUser.get("/SelecionaPedido",authenticateJWT,authenticatePerfil,PedidoController.Seleciona);
routerUser.get("/SelecionaProdutoFav/:id",authenticateJWT,ProdutoFavController.Seleciona);
routerUser.get("/VerificaLogin",LoginController.VerificaLogin);

//Filtros


export default routerUser;  

