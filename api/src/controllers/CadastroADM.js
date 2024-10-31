import obterConexaoDoPool from "../config/mysql.js"
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
            
            const verificaCampos = cPessoa.verificaCampos()
            if(!verificaCampos){
                return res.status(400).json({ error: "O número máximo de caracteres permitidos foi excedido." });
            }
            const validaCampos = cPessoa.validaCampos()
            if(!validaCampos){
                return res.status(400).json({ error: "Dados inválidos. Verifique os campos e tente novamente." });
            }

            const verificaCPF = cPessoa.validaCpf()
            if (!verificaCPF) {
                return res.status(400).json({ error: "CPF inválido. Verifique o número e tente novamente." });
            }
            const conversaoData = cPessoa.DataConvert()
            if (conversaoData == "Invalid Date") {
                return res.status(400).json({ error: "Data inválida. Verifique o formato e tente novamente." });
            }

            cPessoa.Data_nasc = conversaoData;

            const verificarCPFBanco = await cPessoa.verificaCpf()
            if (verificarCPFBanco) {
                return res.status(400).json({ error: "CPF já cadastrado. Por favor, insira um CPF diferente." });
            }

            //Chamar o crud 
            const insertPessoa = await cPessoa.CadastrarPessoa();
            let insertTele;
            if (!insertPessoa.error) {
                const cLogin = new Login(null, Usuario, "DUANE123@",1, 1,perfil, insertPessoa);
                const VerificaLogin = cLogin.verificaCampos()
                const validaLogin = cLogin.validaCamposADM()
                if(!VerificaLogin){
                    return res.status(400).json({ error: "O número máximo de caracteres permitidos foi excedido." });
                }
                if(!validaLogin){
                    return res.status(400).json({ error: "Dados inválidos. Verifique os campos e tente novamente." });
                }
                const verificaEmail = await cLogin.VerificaUsuario()
                if (!verificaEmail) {
                    const deletarPessoa = cPessoa.DeletarPessoa()
                    return res.status(400).json({ error: "Usuario já cadastrado. Por favor, insira um CPF diferente." });
                }
                const verificaLog = await cLogin.VerificaUsuario()
                if (!verificaLog) {
                    return res.status(400).json({ error: "EMAIL já cadastrado. Por favor, insira um CPF diferente." });
                }
                
                const insertLogin = await cLogin.CadastrarLogin();
                if (!insertLogin.error) {
                    if (Telefones.length > 0) {
                        console.log(Telefones);
                        for (const numeroTelefone of Telefones) {
                            console.log(numeroTelefone);
                            
                            // Cria uma nova instância da classe Telefone
                            const novoTelefone = new Telefone(null, numeroTelefone, insertPessoa);
                            
                            // Verifica se os campos são válidos
                            const verificaTele = novoTelefone.verificaCampos();
                            const validaTele = novoTelefone.validaCampos();
                    
                            // Se a verificação falhar, retorna erro 500
                            if (!verificaTele) {
                                return res.status(400).json({ error: "O número máximo de caracteres permitidos foi excedido." });
                            }
                    
                            // Se a validação falhar, retorna erro 400
                            if (!validaTele) {
                                return res.status(400).json({ error: "Dados inválidos. Verifique os campos e tente novamente." });
                            }
                    
                            const insertTele = await novoTelefone.CadastrarTelefone();
                            if (insertTele.error) {
                                await Promise.all([
                                    cLogin.DeletarLogin(),
                                    cPessoa.DeletarPessoa()
                                ]);
                                return res.status(400).json({ error: "Erro ao cadastrar o número. Verifique os dados e tente novamente." });
                            }
                        }
                    }
                } else {
                    console.log("teste")
                    const deletarPessoa = cPessoa.DeletarPessoa()
                    return res.status(400).json({ error: "Erro ao cadastrar o login. Verifique os dados fornecidos e tente novamente." });
                }
                return res.status(400).json({ error: "Erro ao cadastrar o usuario. Verifique os dados fornecidos e tente novamente." });

            } else {
                return res.status(400).json({ error: "Erro ao cadastrar usuário!" });
            }


        } catch (error) {
            console.error(error); // Para debugar o erro
            res.status(500).json({ error: "Erro ao cadastrar o usuário" });
        }
    },
    EditarPessoaADM: async (req, res) => {
        const conn = await obterConexaoDoPool();
        try {
            await conn.beginTransaction();
            const { id } = req.params; // ID da pessoa
            const { Nome, Data_Nasc, Telefones } = req.body;
            const cPessoa = new Pessoa(id, Nome, Data_Nasc);
            const vericaCampos = cPessoa.verificaCamposADM()
            if(!vericaCampos){
                return res.status(500).json({ message: "Numero máximo de caracteres "})
            }
            const validaCampos = cPessoa.validaCamposADM()
            if(!validaCampos){
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }

            const conversaoData = cPessoa.DataConvert()
            if (conversaoData == "Invalid Date") {
                return res.status(400).json({ message: "Erro Data invalida" });
            }
            cPessoa.Data_nasc = conversaoData;
            const modificaPessoa = await cPessoa.ModificaPessoaADM(conn);
            for (const item of Telefones) {
                const cTelefone = new Telefone(item.id, item.Numero);
                const verificaTele = cTelefone.verificaCampos()
                const validaTele = cTelefone.validaCampos()
                if(!verificaTele){
                    return res.status(500).json({ message: "Numero máximo de caracteres "})
                }
                if(!validaTele){
                    return res.status(400).json({ error: "Dados inválidos fornecidos." });
                }
                const modificaTelefone = await cTelefone.ModificaTelefone(conn);
                if (modificaPessoa.error || modificaTelefone.error) {
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