import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

// Blacklist para armazenar tokens inválidos
let blacklist = [];

// Middleware de autenticação JWT
const authenticateJWT = (req, res, next) => {   
    const secretKey = process.env.SECRET_KEY;
    const token = req.headers['x-access-token']
    
    // Verifica se o token está presente
    if (!token) {
        return res.status(401).json({ message: "Acesso negado: Token não fornecido." });
    }

    // Verifica se o token está na blacklist
    if (blacklist.includes(token)) {
        return res.status(401).json({ message: "Token inválido." });
    }

    try {
        const verifica = jwt.verify(token, secretKey)
        req.id = verifica.id;
        req.perfil = verifica.perfil;

        if (req.path === '/verificar-token') {
            return res.status(200).json({ message: "Token válido." });
        }

        next();
    } catch (error) {
        console.log("Erro de autenticação JWT:", error);
        return res.status(401).json({ message: "Token inválido ou expirado." });
    }
};

// Função para invalidar (matar) o token, ou seja, adicionar à blacklist
const invalidateToken = (token) => {
    blacklist.push(token);
};



// Rota de logout ou para invalidar o token
const logout = (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(400).json({ message: "Token não fornecido." });
    }
    invalidateToken(token);
    return res.status(200).json({ message: "Token inválido" });
};

export default authenticateJWT;
export { logout };
