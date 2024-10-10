import Login from "../model/Login.js";
import Pessoa from "../model/Pessoa.js"
import Telefone from "../model/Telefone.js";

/**
 * CadastroUsuario / CadastroPessoa ....
 */
const CadastroUsuario = {
    //Cadastrar a pessoa (Perfil)
    CadastroPessoaADM: async (req, res) => {
        try {
            const { Nome, Data_Nasc, CPF, Genero, Usuario, Telefones,perfil } = req.body;
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
                const cLogin = new Login(null, Usuario, "DUANE123@", 0, 1,perfil, insertPessoa);
                const verificaEmail = await cLogin.VerificaUsuario()
                if (!verificaEmail) {
                    const deletarPessoa = cPessoa.DeletarPessoa()
                    return res.status(400).json({ message: "Erro Usuario ja cadastrado" });
                }
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
    ExcluirPessoaADM: async (req, res) => {
        try {
            const id = req.params
            const cPessoa = new Pessoa(id);
            await cPessoa.DeletarPessoa();
            return res.status(200).json({ message: 'Pessoa excluída com sucesso!'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Erro ao excluir pessoa'})
        }
    },
    EditarPessoaADM: async (req, res) => {
        const conn = await obterConexaoDoPool();
        try {
            await conn.beginTransaction();
            const { id } = req.params; // ID da pessoa
            const { Nome, Data_Nasc, Usuario, Telefones } = req.body;
            const cLogin = new Login(null, Usuario, null, null, null, null, id);
            const cPessoa = new Pessoa(id, Nome, Data_Nasc);
            const modificaPessoa = await cPessoa.ModificaPessoaADM(conn);
            const modificaLogin = await cLogin.ModificaLogin(conn);
            for (const item of Telefones) {
                const cTelefone = new Telefone(item.id, item.Numero);
                const modificaTelefone = await cTelefone.ModificaTelefone(conn);
                if (modificaPessoa.error || modificaLogin.error || modificaTelefone.error) {
                    await conn.rollback();
                    return res.status(500).json({ message: 'Erro ao editar dados' })
                }
            }
            await conn.commit()
            return res.status(200).json({ message: 'Dados atualizados com sucesso!' });
        } catch (error) {
            await conn.rollback();
            return res.status(500).json({ message: 'Erro ao editar dados' })
        }
    }
}


export default CadastroUsuario