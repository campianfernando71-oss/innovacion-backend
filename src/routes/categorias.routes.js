import { Router } from "express";
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from "../controllers/categorias.controller.js";

import { authRequired } from "../middlewares/auth.js";

const router = Router();

router.get("/", authRequired, getCategorias);
router.get("/:id", authRequired, getCategoriaById);
router.post("/", authRequired, createCategoria);
router.put("/:id", authRequired, updateCategoria);
router.delete("/:id", authRequired, deleteCategoria);

export default router;
