import { db } from "../config/db.js";

// =======================
// OBTENER TODAS LAS CATEGORÍAS
// =======================
export const getCategorias = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categorias WHERE estado = 1");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// OBTENER CATEGORÍA POR ID
// =======================
export const getCategoriaById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM categorias WHERE id = ?", [id]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Categoría no encontrada" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// CREAR CATEGORÍA
// =======================
export const createCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)",
      [nombre, descripcion]
    );

    res.json({
      id: result.insertId,
      nombre,
      descripcion,
      estado: 1,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// ACTUALIZAR CATEGORÍA
// =======================
export const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE categorias SET nombre = ?, descripcion = ?, estado = ? WHERE id = ?",
      [nombre, descripcion, estado, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Categoría no encontrada" });

    res.json({ message: "Categoría actualizada correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// ELIMINAR (CAMBIAR ESTADO = 0)
// =======================
export const deleteCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "UPDATE categorias SET estado = 0 WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Categoría no encontrada" });

    res.json({ message: "Categoría eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
