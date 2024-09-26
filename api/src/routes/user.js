import express from "express";
const routerUser = express.Router();

import InsertController from "../controllers/Insert.js";

routerUser.post("/CreateUser", InsertController.CadastroPessoa);

export default routerUser;
