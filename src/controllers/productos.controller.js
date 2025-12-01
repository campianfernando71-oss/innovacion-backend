import { db } from "../config/db.js";

// Obtener todos los productos activos
export const getProductos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, c.nombre AS categoria 
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      WHERE p.estado = 1
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener producto por ID
export const getProductoById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM productos WHERE id = ?", [id]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear producto
export const createProducto = async (req, res) => {
  const { nombre, descripcion, categoria_id, cantidad, stock_minimo, precio } =
    req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO productos (nombre, descripcion, categoria_id, cantidad, stock_minimo, precio)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion, categoria_id, cantidad, stock_minimo, precio]
    );

    res.json({
      id: result.insertId,
      nombre,
      descripcion,
      categoria_id,
      cantidad,
      stock_minimo,
      precio,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar producto
export const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, categoria_id, cantidad, stock_minimo, precio, estado } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE productos SET 
       nombre = ?, descripcion = ?, categoria_id = ?, cantidad = ?, 
       stock_minimo = ?, precio = ?, estado = ? 
       WHERE id = ?`,
      [nombre, descripcion, categoria_id, cantidad, stock_minimo, precio, estado, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto actualizado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar producto (Soft Delete)
export const deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "UPDATE productos SET estado = 0 WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
