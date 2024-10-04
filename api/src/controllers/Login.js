import Login from "../model/Login.js";
import * as dotenv from "dotenv";
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
            console.log(cLogin)
            const verificaLogin = await cLogin.VerificaLogin()
            console.log(verificaLogin)
            if(!verificaLogin){
                return res.status(500).json({ message: "Usuario ou senha incorretos"})
            }
            if(verificaLogin==="Usuario Inativo"){
                return res.status(500).json({ message: "Usuario inativado"})
            }
            console.log(verificaLogin)
            return res.status(200).json({ message: "Passou" })

        } catch (error) {
            res.status(500).json({ message: "Erro ao cadastrar produto!" })
        }
    }
}

export default LoginController