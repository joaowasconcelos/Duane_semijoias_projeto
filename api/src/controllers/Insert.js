import Categoria from "../model/Categoria.js";
import Cupons from "../model/Cupons.js";
import Endereco from "../model/Endereco.js";
import Estoque from "../model/Estoque.js";
import Feedback from "../model/Feedback.js";
import Frete from "../model/Frete.js";
import Item from "../model/Itens.js";
import Login from "../model/Login.js";
import Pagamento from "../model/Pagamento.js";
import Pedido from "../model/Pedido.js";
import Perfil from "../model/Perfil.js";
import Pessoa from "../model/Pessoa.js"
import Preco from "../model/Preco.js";
import Produto from "../model/Produto.js";
import Produto_Img from "../model/Produto_img.js";
import Produto_Fav from "../model/Produtos_favoritos.js";
import Promocao from "../model/Promocao.js";
import Telefone from "../model/Telefone.js";

/**
 * 
 */
const InsertController = {
    //Cadastrar a pessoa (Perfil)
    CadastroPessoa: async (req, res) => {
        try {
            console.log(req.body);
            const { Nome, Data_Nasc, CPF, Genero, Usuario, Senha, Telefones } = req.body;
            console.log(Telefones)
            const cPessoa = new Pessoa(null, Nome, Data_Nasc, CPF, Genero);
            const cLogin = new Login(null, Usuario, Senha);
            //Chamar o crud 
            const insertPessoa = await cPessoa.CadastrarPessoa()
            console.log(insertPessoa)
            if (insertPessoa > 0) {
                if (Telefones.length > 0) {
                    Telefones.forEach(numeroTelefone => {
                        const novoTelefone = new Telefone(null, numeroTelefone, insertPessoa);
                        novoTelefone.CadastrarTelefone();
                    });
                }
                res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
            }else{
                const deletar = cPessoa.DeletarPessoa()
                res.status(400).json({ message: "Erro ao cadastrar usuário!" });
            }

        } catch (error) {
            console.error(error); // Para debugar o erro
            res.status(500).json({ error: "Erro ao cadastrar o usuário" });
        }
    }
}


export default InsertController