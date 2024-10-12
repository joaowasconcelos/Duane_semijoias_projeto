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
import LoginController from "../controllers/Login.js";
import CadastroADM from "../controllers/CadastroADM.js"
import CuponsController from "../controllers/Cupons.js";
import ProdutoController from "../controllers/Produto.js";

//Insert
routerUser.post("/CreateUser",CadastroUsuario.CadastroPessoa);//ESSA ROTA O PRÓPRIO USUÁRIO INSERE SEUS DADOS E SE CADASTRA
routerUser.post("/CreateADM",authenticateJWT,authenticatePerfil,CadastroADM.CadastroPessoaADM);//ESSA ROTA O ADM CADASTRA UM USUARIO 
routerUser.post("/CreateCategoria",authenticateJWT,authenticatePerfil,CategoriaController.Cadastro);//ESSA ROTA CADASTRA CATEGORIAS
routerUser.post("/CreatePromocao",authenticateJWT,authenticatePerfil,PromocaoController.Cadastro);//ESSA ROTA O ADM CADASTRA UMA PROMOÇÃO 
routerUser.post("/CreatePedido",authenticateJWT,PedidoController.Cadastro);//trocar para o JWT
routerUser.post("/CreatePedidoFav/:id",authenticateJWT,ProdutoFavController.Cadastro);//trocar para o JWT

routerUser.post("/CreateCupom",authenticateJWT,authenticatePerfil,CuponsController.CreateCupons)
routerUser.post("/CreateProduto",authenticateJWT,authenticatePerfil,ProdutoController.cadastro)

//Delete
// routerUser.delete("/DeleteCategoria/:id",authenticateJWT,authenticatePerfil,CategoriaController.Deletar);
// routerUser.delete("/DeletePromocao/:id",authenticateJWT,authenticatePerfil,PromocaoController.Deletar);
// routerUser.delete("/DeletePedido/:id",authenticateJWT,authenticatePerfil,PedidoController.Deletar);
// routerUser.delete("/DeleteUser/:id",authenticateJWT,authenticatePerfil,CadastroUsuario.ExcluirPessoa);
// routerUser.delete("/DeleteUser/:id",authenticateJWT,authenticatePerfil,CadastroADM.ExcluirPessoa)// ADM
// Por enquanto o administrador não poderá excluir um usuario pois isso altera algumas informações em nosso banco
routerUser.delete("/DeleteProdutoFav/:id",authenticateJWT,authenticatePerfil,ProdutoFavController.Delete);

//Update
routerUser.put("/ModificaCategoria/:id",authenticateJWT,authenticatePerfil,CategoriaController.Modifica);
routerUser.put("/ModificaPromocao/:id",authenticateJWT,authenticatePerfil,PromocaoController.Modifica);
routerUser.put("/ModificaPedido/:id",authenticateJWT,authenticatePerfil,PedidoController.Modifica);
routerUser.put("/ModificarProduto/:id",authenticateJWT,authenticatePerfil,ProdutoController.editar)
routerUser.put("/ModificarPessoa/:id",CadastroUsuario.EditarPessoa)
routerUser.put("/ModificarPessoaADM/:id",CadastroADM.EditarPessoaADM)
routerUser.put("/InativarConta",authenticateJWT,LoginController.Inativar)
routerUser.put("/AtivarConta",authenticateJWT,LoginController.Ativar)
routerUser.put("/ModificaCupom/:id",authenticateJWT,authenticatePerfil,CuponsController.Edita);

//Select
routerUser.get("/SelecionaCategoria",CategoriaController.Seleciona);
routerUser.get("/SelecionaPedido",PedidoController.Seleciona);
routerUser.get("/SelecionaProdutoFav/:id",authenticateJWT,ProdutoFavController.Seleciona);
routerUser.get("/VerificaLogin",LoginController.VerificaLogin);
routerUser.get("/SelecionaProduto",ProdutoController.Seleciona);
routerUser.get("/VerificaItens",PromocaoController.Verifica);//Essa rota verifica se os itens realmente está em promoção e verifica se está atendendo a porcentagem anteriormente definida

//Filtros
routerUser.get("/SelecionaPromocao",PromocaoController.Seleciona);

export default routerUser;  

