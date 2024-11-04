import Login from "../model/Login.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();


const LoginController = {
    VerificaLogin: async (req, res) => {
        try {

            const secretKey = process.env.SECRET_KEY;
            if (!secretKey) {
                return res.status(401).send("Chave secreta não configurada.");
            }
            const { login, senha } = req.query

            const cLogin = new Login(null, login, senha)
            const verificaCampos = cLogin.verificaCampos()
            if (!verificaCampos) {
                return res.status(500).json({ error: "Numero máximo de caracteres " })
            }
            const verificaLogin = await cLogin.VerificaLogin()


            if (!verificaLogin) {
                return res.status(500).json({ error: "Usuário ou senha incorretos" })
            }
            if (verificaLogin === "Usuario Inativo") {
                return res.status(500).json({ error: "Usuário inativado" })
            }
           
            if (verificaLogin[0].primeiro_login === 1) {
                return res.status(202).json({ message: "Primeiro Login desse usuário, precisa redefinir a senha", })
            }

            const token = jwt.sign({ id: verificaLogin[0].pessoa_id, user: verificaLogin[0].usuario, perfil: verificaLogin[0].perfis_id }, secretKey, { expiresIn: 10 })
            return res.json({ auth: true, token: token })

        } catch (error) {
            res.status(500).json({ error: "Erro ao verificar login!" })
        }
    },

    PrimeiroLogin: async (req, res) => {
        try {
            const { login, senha } = req.body; 
        
            if (senha == null || senha === "undefined" || senha.length > 50) {
                return res.status(400).json({ error: "Insira uma senha válida " })
            }

            const cLogin = new Login(null, login, senha, 0)
            const definirSenha = await cLogin.primeiroLogin()
            if(definirSenha === "User Invalid"){
                return res.status(401).json({error:"Usuario Inválido"})
            }
            console.log(definirSenha)
            return res.json({ message: "Senha definida com sucesso!" })

        } catch (error) {
            return res.status(500).json({ error: "Erro ao cadastrar senha!" })
        }
    },

    Inativar: async (req, res) => {
        try {
            const id = req.id
            const cLogin = new Login(null, null, null, null, null, null, id)
            const inativar = await cLogin.InativaUsuario()
            if (inativar.error) return res.status(400).json({ error: "Erro ao inativar usuário!" })
            return res.json({ message: "Usuário inativado com sucesso!" })
        } catch (error) {
            return res.status(500).json({ error: "Erro ao inativar usuário!" })
        }
    },
    Ativar: async (req, res) => {
        try {
            const id = req.id
            const cLogin = new Login(null, null, null, null, null, null, id)
            const inativar = await cLogin.InativaUsuario()
            if (inativar.error) return res.status(400).json({ error: "Erro ao ativar usuário!" })
            return res.json({ message: "Usuário ativo com sucesso!" })
        } catch (error) {
            return res.status(500).json({ error: "Erro ao ativar usuário!" })
        }
    },

    EsqueciSenha: async (req, res) => {
        try {
            const { login, nova_senha } = req.body
            const cLogin = new Login(null, login, null, null, null, null, null, nova_senha)
            const esqueciSenha = await cLogin.EsqueciSenha()
            if (esqueciSenha.error) {
                return res.status(400).json({ error: "Erro ao registrar nova senha!" });
            }
            console.log(esqueciSenha)
            return res.status(200).json({ message: "Senha alterada com sucesso!" })

        } catch (error) {
            return res.status(500).json({ error: "Erro no processo" })
        }
    },

    AlteraSenha: async (req, res) => {
        try {
            const { senhaAtual, novaSenha } = req.body
            const id = req.id
            if (senhaAtual === novaSenha) {
                return res.status(401).json({ error: "Senhas iguais, forneça senhas diferentes" })
            }
            console.log("aqui", senhaAtual, novaSenha, id)
            const cLogin = new Login(null, null, senhaAtual, null, null, null, id, novaSenha)
            const validaCampos = cLogin.validaCampos()
            console.log(validaCampos)
            if (!validaCampos) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }
            const AlterarSenha = await cLogin.AlterarSenha()
            console.log(AlterarSenha)
            if (AlterarSenha === "Senha atual incorreta") {
                return res.status(401).json({ error: "Senha atual incorreta!" })
            }
            return res.status(200).json({ message: "Senha alterada com sucesso!" })

        } catch (error) {
            return res.status(500).json({ error: "Erro no processo" })
        }
    },

    RecuperarSenha: async (req,res) => {
        try {
            
        } catch (error) {
            
        }
    }
      
}

export default LoginController