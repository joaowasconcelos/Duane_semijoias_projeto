import nodemailer from 'nodemailer';
import * as dotenv from "dotenv";
import Login from "../model/Login.js";
import jwt from "jsonwebtoken";
dotenv.config()

const ResetControler = {
    resetSenha: async (req,res) => {
        try {
    
            const {email} = req.body
            const oLog = new Login(null, email)
            const ID = oLog.procuraID()
            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign({ id: ID }, secretKey, { expiresIn: "1h" })

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // false para usar STARTTLS
                auth: {
                    user: "murilo.aguiar2303@gmail.com",
                    pass: "lfov hzit jylo rrco", // Use a senha de aplicativo aqui
                },
                tls: {
                    rejectUnauthorized: false, // Apenas se precisar resolver problemas com SSL/TLS
                },
            })

            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: 'Redefinir Senha',
                text: `Você solicitou mas n vai funcionar e so um teste a redefinição de sua senha. Use este link para redefinir sua senha: http://127.0.0.1:5500/web/publico/html/redefinirSenha.html?token=${token} `,
            })

           
            return res.status(200).json({ message: "Email Enviado" })
        } catch (error) {
            console.log("Erro ao enviar email", error)
        }
    }

}


export default ResetControler;