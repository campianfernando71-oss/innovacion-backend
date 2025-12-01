import { Router } from "express";
import { getUsuarios, createUsuario } from "../controllers/usuarios.controller.js";
import { authRequired } from "../middlewares/auth.js";

const router = Router();

router.get("/", authRequired, getUsuarios);
router.post("/", authRequired, createUsuario);

export default router;
