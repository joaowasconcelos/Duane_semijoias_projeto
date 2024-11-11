import express from "express";
const routerUser = express.Router();

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
import FeedbackController from "../controllers/Feedback.js";
import ResetControler from "../controllers/ReqSenha.js";
import { logout } from "../middleware/authenticateJWT.js";
import { upload,handleImageUpload} from "../middleware/imagens.js";

//Insert
routerUser.post("/CreateUser",CadastroUsuario.CadastroPessoa);//USUARIO
routerUser.post("/CreatePedido",authenticateJWT,PedidoController.Cadastro);//USUARIO
routerUser.post("/CreatePedidoFav/:id",authenticateJWT,ProdutoFavController.Cadastro);//USUARIO
routerUser.post('/Feedback/:id_produto',authenticateJWT,FeedbackController.Cadastro);//USUARIO
routerUser.post("/CreateADM",authenticateJWT,authenticatePerfil,CadastroADM.CadastroPessoaADM);//ADM
routerUser.post("/CreateCategoria",authenticateJWT,authenticatePerfil,CategoriaController.Cadastro);//ADM
// routerUser.post("/CreatePromocao",authenticateJWT,authenticatePerfil,PromocaoController.Cadastro);//ADM 
routerUser.post("/CreateCupom",authenticateJWT,authenticatePerfil,CuponsController.CreateCupons)//ADM
routerUser.post("/CreateProduto",authenticateJWT,authenticatePerfil,upload.array("imagem",5),handleImageUpload,ProdutoController.cadastro)//ADM
routerUser.post("/ModificaCategoria/:id",authenticateJWT,authenticatePerfil,CategoriaController.Modifica);//ADM
routerUser.post("/InativaCategoria/:id",authenticateJWT,authenticatePerfil,CategoriaController.Inativar);//ADM
routerUser.post("/PrimeiroAcesso",LoginController.PrimeiroLogin);//USUARIO


//Delete
// routerUser.delete("/DeleteCategoria/:id",authenticateJWT,authenticatePerfil,CategoriaController.Deletar);
// routerUser.delete("/DeletePromocao/:id",authenticateJWT,authenticatePerfil,PromocaoController.Deletar);
// routerUser.delete("/DeletePedido/:id",authenticateJWT,authenticatePerfil,PedidoController.Deletar);
// routerUser.delete("/DeleteUser/:id",authenticateJWT,authenticatePerfil,CadastroUsuario.ExcluirPessoa);
// routerUser.delete("/DeleteUser/:id",authenticateJWT,authenticatePerfil,CadastroADM.ExcluirPessoa)// ADM
routerUser.delete("/DeleteProdutoFav/:id",authenticateJWT,authenticatePerfil,ProdutoFavController.Delete);

//Update
routerUser.put("/ModificaPromocao/:id",authenticateJWT,authenticatePerfil,PromocaoController.Modifica);//ADM
routerUser.put("/ModificaPedido/:id",authenticateJWT,authenticatePerfil,PedidoController.Modifica);//ADM
routerUser.put("/ModificarProduto/:id",authenticateJWT,authenticatePerfil,ProdutoController.editar)//ADM
routerUser.put("/ModificarPessoaADM/:id",authenticateJWT,authenticatePerfil,CadastroADM.EditarPessoaADM)//ADM
routerUser.put("/ModificaCupom/:id",authenticateJWT,authenticatePerfil,CuponsController.Edita);//ADM
routerUser.put("/ModificarPessoa",authenticateJWT,CadastroUsuario.EditarPessoa)//USUARIO
routerUser.put("/InativarConta",authenticateJWT,LoginController.Inativar)//USUARIO
routerUser.put("/AtivarConta",authenticateJWT,LoginController.Ativar)//USUARIO
routerUser.put("/EsqueciSenha",LoginController.EsqueciSenha);//USUARIO
routerUser.put("/AlterarSenha",authenticateJWT,LoginController.AlteraSenha);//USUARIO
routerUser.put('/Feedback/:id_feedback',authenticateJWT,FeedbackController.Modificar);//USUARIO

//Select
routerUser.get("/SelecionaCategoria",CategoriaController.Seleciona);
routerUser.get("/SelecionaUsuarios",CadastroUsuario.Seleciona);
routerUser.get("/SelecionaFuncionarios",CadastroUsuario.SelecionaADM);
routerUser.get("/SelecionaInfoUsers",authenticateJWT,CadastroUsuario.SelecionaInfoId);
routerUser.get("/SelecionaPedido",authenticateJWT,authenticatePerfil,PedidoController.Seleciona);//ADM
routerUser.get("/SelecionaProdutoFav",authenticateJWT,ProdutoFavController.Seleciona);//USUARIO
routerUser.get("/VerificaLogin",LoginController.VerificaLogin);//USUARIO
routerUser.get("/SelecionaProduto",ProdutoController.Seleciona);
routerUser.get('/Feedback/:idProduto',authenticateJWT,FeedbackController.SelecionarPorProduto);
routerUser.get('/selecionaCupons',authenticateJWT,authenticatePerfil,CuponsController.Seleciona)
routerUser.get('/selecionaCupons/:id',authenticateJWT,authenticatePerfil,CuponsController.SelecionaDetalhes)
routerUser.get('/MeusPedidos',authenticateJWT,PedidoController.selecionaMeusPedidos)
routerUser.get('/MeuPedido/:id',authenticateJWT,authenticatePerfil,PedidoController.SelecionaDetalhes)

//Filtros
routerUser.get("/SelecionaPromocao",PromocaoController.Seleciona);
routerUser.get("/SelecionaProdutoMaior",ProdutoController.SelecionaMaiorMenor);
routerUser.get("/SelecionaProdutoMenor",ProdutoController.SelecionaMenorMaior);
routerUser.get("/SelecionaProdutoMaisVendido",ProdutoController.SelecionaMaisVendido);
routerUser.get("/SelecionaProdutoCate/:id",ProdutoController.SelecionaCate);
routerUser.get("/SelecionaProdutoCate/:id",ProdutoFavController.Seleciona);
routerUser.get("/logout",logout);

//ResetSenha
routerUser.post("/ResetSenha",ResetControler.resetSenha);//USUARIO

export default routerUser;  

