import Login from "../model/Login.js";
import Pessoa from "../model/Pessoa.js"
import Telefone from "../model/Telefone.js";

/**
 * CadastroUsuario / CadastroPessoa ....
 */
const CadastroUsuario = {
    //Cadastrar a pessoa (Perfil)
    CadastroPessoa: async (req, res) => {
        try {
            const { Nome, Data_Nasc, CPF, Genero, Usuario, Senha, Telefones } = req.body;
            const cPessoa = new Pessoa(null, Nome, Data_Nasc, CPF, Genero);
            console.log(cPessoa)

            const verificaCPF = cPessoa.validaCpf()
            if (!verificaCPF) {
                return res.status(400).json({ message: "Erro CPF invalido" });
            }

            const conversaoData = cPessoa.DataConvert()


            if (conversaoData == "Invalid Date") {
                return res.status(400).json({ message: "Erro Data invalida" });
            }

            cPessoa.Data_nasc = conversaoData;

            const verificarCPFBanco = await cPessoa.verificaCpf()
            console.log(verificarCPFBanco)
            if (verificarCPFBanco) {
                return res.status(400).json({ message: "Erro CPF ja cadastrado" });
            }

            //Chamar o crud 
            const insertPessoa = await cPessoa.CadastrarPessoa();
            let insertTele;
            if (!insertPessoa.error) {
                const cLogin = new Login(null, Usuario, Senha, 0, 1, 2, insertPessoa);
                const insertLogin = await cLogin.CadastrarLogin();

                if (!insertLogin.error) {
                    if (Telefones.length > 0) {
                        for (const numeroTelefone of Telefones) {
                            const novoTelefone = new Telefone(null, numeroTelefone, insertPessoa);
                            insertTele = await novoTelefone.CadastrarTelefone();
                            if (insertTele.error) {
                                const deleteLogin = cLogin.DeletarLogin();
                                const deletarPessoa = cPessoa.DeletarPessoa();
                                return res.status(400).json({ message: "Erro ao cadastrar Numero!" });

                            }
                        };
                    }
                } else {
                    const deletarPessoa = cPessoa.DeletarPessoa()
                    return res.status(400).json({ message: "Erro ao cadastrar Login!" });
                }
                return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
            } else {
                return res.status(400).json({ message: "Erro ao cadastrar usuário!" });
            }


        } catch (error) {
            console.error(error); // Para debugar o erro
            res.status(500).json({ error: "Erro ao cadastrar o usuário" });
        }
    },
    EditarPessoa: async (req, res) => {

        try {
            const { id } = req.params; // ID da pessoa
            const { Nome, Data_Nasc, CPF, Usuario, Telefones } = req.body;
            
            const telefoneExistente = new Telefone(null, null, id);
            const telefonesBanco = await telefoneExistente.SelecionaTelefonesPorPessoa();
    
            // Telefones que vieram do front
            const numeroFront1 = Telefones[0].Numero;
            const numeroFront2 = Telefones[1].Numero;
    
            // Telefones do banco de dados
            const numeroBanco1 = telefonesBanco[0].numero;
            const numeroBanco2 = telefonesBanco[1].numero;
    
                
            if (numeroFront1 !== numeroBanco1) {
                const telefoneParaAtualizar = new Telefone(telefonesBanco[0].id, numeroFront1, id);
                await telefoneParaAtualizar.ModificaTelefone();
            }
            if (numeroFront2 !== numeroBanco2) {
                const telefoneParaAtualizar = new Telefone(telefonesBanco[1].id, numeroFront2, id);
                await telefoneParaAtualizar.ModificaTelefone();
            }
            //Voltar para fazer a porra do rollback

            const cPessoa = new Pessoa(id, Nome, Data_Nasc, CPF);
            await cPessoa.ModificaPessoa();

            const cLogin = new Login(null, Usuario,null,null,null,null,id);
            await cLogin.ModificaLogin();
    
            return res.status(200).json({ message: 'Dados atualizados com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Erro ao editar dados'})
        }
    },
    ExcluirPessoa: async (req, res) => {
        try {
            const id = req.params
            const cPessoa = new Pessoa(id);
            await cPessoa.DeletarPessoa();
            return res.status(200).json({ message: 'Pessoa excluída com sucesso!'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Erro ao excluir pessoa'})
        }
    }
}


export default CadastroUsuario