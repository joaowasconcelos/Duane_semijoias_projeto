import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()


export default async (email, token) => {
    try {
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
            text: `Você solicitou a redefinição de sua senha. Use este link para redefinir sua senha: http://localhost:nossarota/resetPassword/${token}`,
        })

        console.log("EMAIL ENVIADO")
    } catch (error) {
        console.log("Erro ao enviar email", error)
    }
}


