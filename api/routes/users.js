import express from "express";
import { getUsers } from "../controllers/user.js";

const router = express.Router(); //cria uma rota

router.get("/", getUsers); //Como nao vai ter nenhuma rota por ser um projeto simples, informa que começa na raiz do prjeto e chama o método getUsers

export default router; //exporta a rota criada