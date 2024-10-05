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
    }
}

export default LoginController