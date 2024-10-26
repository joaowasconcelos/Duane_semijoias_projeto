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
// import UploadImagens from "../controllers/Imagens.old.js";
// import UploadImagens from "../controllers/Imagens.js";
import FeedbackController from "../controllers/Feedback.js";
import { logout } from "../middleware/authenticateJWT.js";
import { upload } from "../middleware/imagens.js";



//Insert
routerUser.post("/CreateUser",CadastroUsuario.CadastroPessoa);//USUARIO
routerUser.post("/CreatePedido",authenticateJWT,PedidoController.Cadastro);//USUARIO
routerUser.post("/CreatePedidoFav/:id",authenticateJWT,ProdutoFavController.Cadastro);//USUARIO
routerUser.post('/Feedback/:id_produto',authenticateJWT,FeedbackController.Cadastro);//USUARIO
routerUser.post("/CreateADM",authenticateJWT,authenticatePerfil,CadastroADM.CadastroPessoaADM);//ADM
routerUser.post("/CreateCategoria",authenticateJWT,authenticatePerfil,CategoriaController.Cadastro);//ADM
routerUser.post("/CreatePromocao",authenticateJWT,authenticatePerfil,PromocaoController.Cadastro);//ADM 
routerUser.post("/CreateCupom",authenticateJWT,authenticatePerfil,CuponsController.CreateCupons)//ADM
routerUser.post("/CreateProduto",authenticateJWT,authenticatePerfil,upload.array("imagem",5),ProdutoController.cadastro)//ADM
// routerUser.post('/postagens/:id_produto',,UploadImagens.Imagens);//ADM   
// routerUser.post('/postagens/:id_produto',UploadImagens.Multer,authenticateJWT,authenticatePerfil,UploadImagens.Imagens);//ADM


//Delete
// routerUser.delete("/DeleteCategoria/:id",authenticateJWT,authenticatePerfil,CategoriaController.Deletar);
// routerUser.delete("/DeletePromocao/:id",authenticateJWT,authenticatePerfil,PromocaoController.Deletar);
// routerUser.delete("/DeletePedido/:id",authenticateJWT,authenticatePerfil,PedidoController.Deletar);
// routerUser.delete("/DeleteUser/:id",authenticateJWT,authenticatePerfil,CadastroUsuario.ExcluirPessoa);
// routerUser.delete("/DeleteUser/:id",authenticateJWT,authenticatePerfil,CadastroADM.ExcluirPessoa)// ADM
// Por enquanto o administrador não poderá excluir um usuario pois isso altera algumas informações em nosso banco
routerUser.delete("/DeleteProdutoFav/:id",authenticateJWT,authenticatePerfil,ProdutoFavController.Delete);
// routerUser.delete('/DeleteImage/:id',authenticateJWT,authenticatePerfil,UploadImagens.DeleteImage);

//Update
routerUser.post("/ModificaCategoria/:id",authenticateJWT,authenticatePerfil,CategoriaController.Modifica);//ADM
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
routerUser.get("/SelecionaInfoUsers",authenticateJWT,CadastroUsuario.SelecionaInfoId);
routerUser.get("/SelecionaPedido",PedidoController.Seleciona);//ADM
routerUser.get("/SelecionaProdutoFav",authenticateJWT,ProdutoFavController.Seleciona);//USUARIO
routerUser.get("/VerificaLogin",LoginController.VerificaLogin);//USUARIO
routerUser.get("/PrimeiroAcesso",LoginController.PrimeiroLogin);//USUARIO
routerUser.get("/SelecionaProduto",ProdutoController.Seleciona);
//routerUser.get("/VerificaItens",PromocaoController.Verifica);//Essa rota verifica se os itens realmente está em promoção e verifica se está atendendo a porcentagem anteriormente definida
// routerUser.get('/Postagens',UploadImagens.listAllFiles);
// routerUser.get('/Postagens/:filename',UploadImagens.listAllFilesId);
routerUser.get('/Feedback/:idProduto',authenticateJWT,FeedbackController.SelecionarPorProduto);
routerUser.get('/selecionaCupons',CuponsController.Seleciona)
routerUser.get('/selecionaCupons/:id',CuponsController.SelecionaDetalhes)
routerUser.get('/MeusPedidos',authenticateJWT,PedidoController.selecionaMeusPedidos)
routerUser.get('/MeuPedido/id:',authenticateJWT,PedidoController.SelecionaDetalhes)

//Filtros
routerUser.get("/SelecionaPromocao",PromocaoController.Seleciona);
routerUser.get("/SelecionaProdutoMaior",ProdutoController.SelecionaMaiorMenor);
routerUser.get("/SelecionaProdutoMenor",ProdutoController.SelecionaMenorMaior);
routerUser.get("/SelecionaProdutoMaisVendido",ProdutoController.SelecionaMaisVendido);
routerUser.get("/SelecionaProdutoCate/id:",ProdutoController.SelecionaCate);
routerUser.get("/SelecionaProdutoCate/id:",ProdutoFavController.Seleciona);

//Front-end
routerUser.get("/pagina-admin",authenticateJWT,authenticatePerfil);
routerUser.get("/logout",logout);
// Rota para verificar o token JWT
routerUser.get("/verificar-token", authenticateJWT, (req, res) => {
    res.status(200).json({ message: "Token válido.", id: req.id, perfil: req.perfil });
});


export default routerUser;  

