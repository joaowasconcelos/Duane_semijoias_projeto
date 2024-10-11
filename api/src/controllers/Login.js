import Login from "../model/Login.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const LoginController = {
    VerificaLogin: async (req, res) => {
        try {
            const secretKey = process.env.SECRET_KEY;
            if (!secretKey) {
                return res.status(500).send("Chave secreta não configurada.");
            }
            const {login,senha} = req.body
            const cLogin = new Login(null,login,senha)
            const verificaCampos = cLogin.verificaCampos()
            if(!verificaCampos){
                return res.status(500).json({ message: "Numero máximo de caracteres "})
            }
            const verificaLogin = await cLogin.VerificaLogin()
            console.log(verificaLogin)
            if(!verificaLogin){
                return res.status(500).json({ message: "Usuário ou senha incorretos"})
            }
            if(verificaLogin==="Usuario Inativo"){
                return res.status(500).json({ message: "Usuário inativado"})
            }
            console.log(verificaLogin)
            const token = jwt.sign({id:verificaLogin[0].pessoa_id,user:verificaLogin[0].usuario,perfil:verificaLogin[0].perfis_id},secretKey,{expiresIn:"1h"})
            return res.json({auth:true,token})

        } catch (error) {
            res.status(500).json({ message: "Erro ao cadastrar produto!" })
        }
    },
    Inativar: async (req,res) => {
       try {
        const id = req.id
        const cLogin = new Login(null,null,null,null,null,null,id)
        const inativar = await cLogin.InativaUsuario()
        if(inativar.error) return res.status(500).json({ message: "Erro ao inativar usuário!" })
        return res.json({message:"Usuário inativado com sucesso!"})
       } catch (error) {
        return res.status(500).json({ message: "Erro ao inativar usuário!" })
       }
    },
    Ativar: async (req,res) => {
        try {
         const id = req.id
         const cLogin = new Login(null,null,null,null,null,null,id)
         const inativar = await cLogin.InativaUsuario()
         if(inativar.error) return res.status(500).json({ message: "Erro ao ativar usuário!" })
         return res.json({message:"Usuário ativo com sucesso!"})
        } catch (error) {
         return res.status(500).json({ message: "Erro ao ativar usuário!" })
        }
     }
}

export default LoginController