import { Router } from "express";
import clientesCtrl from "../controllers/clientes.controller.js";

const router = Router();

router.get("/", clientesCtrl.getClientes);
router.post("/", clientesCtrl.createCliente);
router.put("/:id", clientesCtrl.updateCliente);
router.delete("/:id", clientesCtrl.deleteCliente);

export default router;
