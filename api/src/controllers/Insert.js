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

 const InsertController = {
    //Cadastrar a pessoa (Perfil)
    CadastroPessoa: async (req, res) => {
        try {
            console.log(req.body);
            const { Nome, Data_Nasc, CPF, Genero, Usuario, Senha, Telefones } = req.body;
            const cPessoa = new Pessoa(null, Nome, Data_Nasc, CPF, Genero);
            const cLogin = new Login(null, Usuario, Senha);
            const objTelefone = [];
            if (Telefones.length > 0) { 
                Telefones.forEach(numeroTelefone => {
                    const novoTelefone = new Telefone(null, numeroTelefone);
                    objTelefone.push(novoTelefone);
                });
            }
            //Chamar o crud
            const insertPessoa = await cPessoa.CadastrarPessoa(cPessoa)
            console.log("aqui",insertPessoa)
          
            //if verificar se inseriu a pessoa
            if (insertPessoa > 0) {
                // verificar o obj
                // if (objTelefone.length > 0) {
                //     const promises = objTelefone.map(async telefone => {
                //         telefone.idPessoa = insertPessoa; // Associa o ID da pessoa ao telefone
                //         await telefone.CadastrarTelefone(telefone); // Insere cada telefone no banco
                //     });
    
                    // Aguarda a inserção de todos os telefones
                    // const insertTelefone = await Promise.all(promises);
                    const insertTele = await novoTelefone.slgo(objTelefone)
            }
            res.status(201).json({ message: "Usuário cadastrado com sucesso!"});

        } catch (error) {
            console.error(error); // Para debugar o erro
            res.status(500).json({ error: "Erro ao cadastrar o usuário" });
        }
    }

};

export default InsertController