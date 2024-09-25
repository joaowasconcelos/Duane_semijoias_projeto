import jwt from "jsonwebtoken"
import * as dotenv from "dotenv";
dotenv.config();

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

export default authenticateJWT;