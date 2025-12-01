import { Router } from "express";
import { createMovimiento, getMovimientos, getMovimientoById } from "../controllers/movimientos.controller.js";

const router = Router();

// Rutas sin autenticación
router.get("/", getMovimientos);
router.get("/:id", getMovimientoById);
router.post("/", createMovimiento);

export default router;
