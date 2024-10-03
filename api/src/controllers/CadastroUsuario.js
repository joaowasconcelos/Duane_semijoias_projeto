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
            const { id } = req.params;
            const { Nome, Data_Nasc, CPF, Usuario, Telefones } = req.body;
            const cPessoa = new Pessoa(id, Nome, Data_Nasc, CPF);
            const cLogin = new Login(null, Usuario)
            if (Telefones.length > 0) {
                for (const numeroTelefone of Telefones) {
                    /// mudar esse ModificarTelefone pq ta errado
                    const novoTelefone = new Telefone(null, numeroTelefone, id);
                    insertTele = await novoTelefone.ModificaTelefone();

                };
            }
        } catch (error) {

        }
    },
    ExcluirPessoa: async (req, res) => {
        try {
            const id = req.params
        } catch (error) {

        }
    }
}


export default CadastroUsuario