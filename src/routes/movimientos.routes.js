import { Router } from "express";
import { createMovimiento, getMovimientos, getMovimientoById } from "../controllers/movimientos.controller.js";
import { authRequired } from "../middlewares/auth.js";

const router = Router();

router.get("/", authRequired, getMovimientos);
router.get("/:id", authRequired, getMovimientoById);
router.post("/", authRequired, createMovimiento);

export default router;
