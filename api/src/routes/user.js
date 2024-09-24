import express from "express"
const routerUser = express.Router();


import user from "../controllers/user.js"
import pessoa from "../controllers/user.js";

routerUser.get("/testebanco",pessoa.selectPessoa)


export default routerUser;