import obterConexaoDoPool from "../config/mysql.js"
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

            const vericaCampos = cPessoa.verificaCampos()
            if (!vericaCampos) {
                return res.status(400).json({ error: "Numero máximo de caracteres " })
            }
            const validaCampos = cPessoa.validaCampos()
            if (!validaCampos) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }

            const verificaCPF = cPessoa.validaCpf()
            if (!verificaCPF) {
                return res.status(400).json({ error: "Erro CPF invalido" });
            }
            const conversaoData = cPessoa.DataConvert()

            if (conversaoData == "Invalid Date") {
                return res.status(400).json({ error: "Erro Data invalida" });
            }
            cPessoa.Data_nasc = conversaoData;

            const verificarCPFBanco = await cPessoa.verificaCpf()

            if (verificarCPFBanco) {
                return res.status(400).json({ error: "Erro CPF ja cadastrado" });
            }

            //Chamar o crud 
            const insertPessoa = await cPessoa.CadastrarPessoa();
            let insertTele;
            if (!insertPessoa.error) {
                const cLogin = new Login(null, Usuario, Senha, 0, 1, 2, insertPessoa);

                const verificaEmail = await cLogin.VerificaUsuario()

                if (!verificaEmail) {
                    const deletarPessoa = cPessoa.DeletarPessoa()
                    return res.status(400).json({ error: "Erro Usuario ja cadastrado" });
                }
                const verificaLog = await cLogin.VerificaUsuario()

                if (!verificaLog) {
                    return res.status(400).json({ error: "Erro email ja cadastrado" });
                }
                const insertLogin = await cLogin.CadastrarLogin();

                if (!insertLogin.error) {
                    if (Telefones.length > 0) {
                        for (const numeroTelefone of Telefones) {
                            const novoTelefone = new Telefone(null, numeroTelefone, insertPessoa);
                            insertTele = await novoTelefone.CadastrarTelefone();
                            if (insertTele.error) {
                                const deleteLogin = await cLogin.DeletarLogin();
                                const deletarPessoa = await cPessoa.DeletarPessoa();
                                return res.status(400).json({ error: "Erro ao cadastrar Numero!" });

                            }
                        };
                    }
                } else {
                    const deletarPessoa = cPessoa.DeletarPessoa()
                    return res.status(400).json({ error: "Erro ao cadastrar Login!" });
                }
                return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
            } else {
                return res.status(400).json({ error: "Erro ao cadastrar usuário!" });
            }


        } catch (error) {
            console.error(error); // Para debugar o erro
            res.status(500).json({ error: "Erro ao cadastrar o usuário" });
        }
    },
    EditarPessoa: async (req, res) => {
        const conn = await obterConexaoDoPool();
        try {
            await conn.beginTransaction();
            const id = req.id
            const { Nome, Data_Nasc, Genero, Telefones } = req.body;
            const cPessoa = new Pessoa(id, Nome, Data_Nasc, null, Genero);
            const vericaCampos = cPessoa.verificaCamposEditarUsuario()
            if (!vericaCampos) {
                return res.status(400).json({ error: "Numero máximo de caracteres " })
            }
            const validaCampos = cPessoa.validaCamposEditarUsuario()
            if (!validaCampos) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }

            const conversaoData = cPessoa.DataConvert()
            if (conversaoData == "Invalid Date") {
                return res.status(400).json({ error: "Erro Data invalida" });
            }
            cPessoa.Data_nasc = conversaoData;
            const modificaPessoa = await cPessoa.ModificaPessoa(conn);
            for (const item of Telefones) {
                const cTelefone = new Telefone(item.id, item.Numero);
                const modificaTelefone = await cTelefone.ModificaTelefone(conn);

                if (modificaPessoa.error || modificaTelefone.error) {
                    await conn.rollback();
                    return res.status(400).json({ error: 'Erro ao editar dados' })
                }
            }

            await conn.commit()
            return res.status(200).json({ message: 'Dados atualizados com sucesso!' });
        } catch (error) {
            console.error("Erro durante a edição:", error);
            await conn.rollback();
            return res.status(500).json({ error: 'Erro ao editar dados' })
        }
    },
    Seleciona: async (req, res) => {
        try {
            const selectPessoa = await Pessoa.Seleciona()
            return res.json(selectPessoa)
        } catch (error) {
            return res.status(500).json({ error: "Erro ao cadastrar produto!" })
        }
    },
    SelecionaADM: async (req, res) => {
        try {
            const selectPessoa = await Pessoa.SelecionaUsuariosAdm()
            return res.json(selectPessoa)
        } catch (error) {
            return res.status(500).json({ error: "Erro ao cadastrar produto!" })
        }
    },
    SelecionaInfoId: async (req, res) => {
        try {
            const id = req.id;
            const cPessoa = new Pessoa(id);
            const selectPessoa = await cPessoa.SelecionaUsuarios();

            if (!selectPessoa) {
                return res.status(404).json({ error: "Usuário não encontrado!" });
            }

            return res.json(selectPessoa); // Certifique-se de usar 'return' aqui
        } catch (error) {
            return res.status(500).json({ error: "Erro ao selecionar informações do usuário!" }); // 'return' garante que a resposta só seja enviada uma vez
        }
    }

}


export default CadastroUsuario