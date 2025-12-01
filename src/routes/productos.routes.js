import { Router } from "express";
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} from "../controllers/productos.controller.js";

import { authRequired } from "../middlewares/auth.js";

const router = Router();

router.get("/", authRequired, getProductos);
router.get("/:id", authRequired, getProductoById);
router.post("/", authRequired, createProducto);
router.put("/:id", authRequired, updateProducto);
router.delete("/:id", authRequired, deleteProducto);

export default router;
