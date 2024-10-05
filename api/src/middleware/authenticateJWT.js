import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const authenticateJWT = (req, res, next) => {
    const secretKey = process.env.SECRET_KEY;
    const token = req.headers['x-access-token'];
    // Verifica se o token está presente
    if (!token) {
        return res.status(401).json({ message: "Acesso negado: Token não fornecido." });
    }
    try {
        // Verifica o token
        const verifica = jwt.verify(token, secretKey);
        req.id = verifica.id; // Salva o ID da pessoa no request para uso posterior
        req.perfil = verifica.perfil
        next(); // Passa o controle para o próximo middleware
    } catch (error) {
        console.log("Erro de autenticação JWT:", error);
        return res.status(401).json({ message: "Token inválido ou expirado." });
    }
};

export default authenticateJWT;

