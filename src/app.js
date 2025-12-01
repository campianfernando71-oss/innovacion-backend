import express from "express";
import cors from "cors";

// rutas reales
import authRoutes from "./routes/auth.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rutas API
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/categorias", categoriasRoutes);

// ruta base
app.get("/", (req, res) => {
  res.send("API de Innovación Backend funcionando correctamente ✔");
});

export default app;
