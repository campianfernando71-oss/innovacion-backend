import { Router } from "express";
import { getCategorias, createCategoria } from "../controllers/categorias.controller.js";
import { authRequired } from "../middlewares/auth.js";

const router = Router();

router.get("/", authRequired, getCategorias);
router.post("/", authRequired, createCategoria);

export default router;
