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
import UploadImagens from "../controllers/Imagens.js";
import FeedbackController from "../controllers/Feedback.js";

//Insert
routerUser.post("/CreateUser",CadastroUsuario.CadastroPessoa);//ESSA ROTA O PRÓPRIO USUÁRIO INSERE SEUS DADOS E SE CADASTRA
routerUser.post("/CreateADM",authenticateJWT,authenticatePerfil,CadastroADM.CadastroPessoaADM);//ESSA ROTA O ADM CADASTRA UM USUARIO 
routerUser.post("/CreateCategoria",authenticateJWT,authenticatePerfil,CategoriaController.Cadastro);//ESSA ROTA CADASTRA CATEGORIAS
routerUser.post("/CreatePromocao",authenticateJWT,authenticatePerfil,PromocaoController.Cadastro);//ESSA ROTA O ADM CADASTRA UMA PROMOÇÃO 
routerUser.post("/CreatePedido",authenticateJWT,PedidoController.Cadastro);//trocar para o JWT
routerUser.post("/CreatePedidoFav/:id",authenticateJWT,ProdutoFavController.Cadastro);//trocar para o JWT
routerUser.post("/CreateCupom",authenticateJWT,authenticatePerfil,CuponsController.CreateCupons)
routerUser.post("/CreateProduto",authenticateJWT,authenticatePerfil,ProdutoController.cadastro)
routerUser.post('/postagens/:id_produto',UploadImagens.Multer,UploadImagens.Imagens);
routerUser.post('/Feedback/:id_produto',authenticateJWT,authenticatePerfil,FeedbackController.Cadastro);

//Delete
// routerUser.delete("/DeleteCategoria/:id",authenticateJWT,authenticatePerfil,CategoriaController.Deletar);
// routerUser.delete("/DeletePromocao/:id",authenticateJWT,authenticatePerfil,PromocaoController.Deletar);
// routerUser.delete("/DeletePedido/:id",authenticateJWT,authenticatePerfil,PedidoController.Deletar);
// routerUser.delete("/DeleteUser/:id",authenticateJWT,authenticatePerfil,CadastroUsuario.ExcluirPessoa);
// routerUser.delete("/DeleteUser/:id",authenticateJWT,authenticatePerfil,CadastroADM.ExcluirPessoa)// ADM
// Por enquanto o administrador não poderá excluir um usuario pois isso altera algumas informações em nosso banco
routerUser.delete("/DeleteProdutoFav/:id",authenticateJWT,authenticatePerfil,ProdutoFavController.Delete);
routerUser.delete('/DeleteImage/:id',authenticateJWT,authenticatePerfil,UploadImagens.DeleteImage);

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
routerUser.put("/EsqueciSenha",LoginController.EsqueciSenha);
routerUser.put('/Feedback/:id_feedback',authenticateJWT,FeedbackController.Modificar);

//Select
routerUser.get("/SelecionaCategoria",CategoriaController.Seleciona);
routerUser.get("/SelecionaUsuarios",CadastroUsuario.Seleciona);
routerUser.get("/SelecionaInfoUsers/:id",CadastroUsuario.SelecionaInfoId);
routerUser.get("/SelecionaPedido",PedidoController.Seleciona);
routerUser.get("/SelecionaProdutoFav/:id",authenticateJWT,ProdutoFavController.Seleciona);
routerUser.get("/VerificaLogin",LoginController.VerificaLogin);
routerUser.get("/PrimeiroAcesso",LoginController.PrimeiroLogin);
routerUser.get("/SelecionaProduto",ProdutoController.Seleciona);
routerUser.get("/VerificaItens",PromocaoController.Verifica);//Essa rota verifica se os itens realmente está em promoção e verifica se está atendendo a porcentagem anteriormente definida
routerUser.get('/Postagens',UploadImagens.listAllFiles);
routerUser.get('/Postagens/:filename',UploadImagens.listAllFilesId);
routerUser.get('/Feedback/:idProduto',authenticateJWT,FeedbackController.SelecionarPorProduto);

//Filtros
routerUser.get("/SelecionaPromocao",PromocaoController.Seleciona);

export default routerUser;  

