import express from "express";
import cors from "cors";

// rutas reales
import authRoutes from "./routes/auth.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import movimientosRoutes from "./routes/movimientos.routes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rutas API reales
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/movimientos", movimientosRoutes);

// ruta base
app.get("/", (req, res) => {
  res.send("API de Innovación Backend funcionando correctamente ✔");
});

export default app;
