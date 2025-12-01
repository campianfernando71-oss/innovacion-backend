import { db } from "../config/db.js";

// Obtener todos los clientes activos
const getClientes = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM clientes WHERE estado = 1");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear cliente
const createCliente = async (req, res) => {
  const { nombre, documento, telefono, direccion, email } = req.body;

  if (!nombre)
    return res.status(400).json({ message: "El nombre es obligatorio" });

  try {
    const [result] = await db.query(
      `INSERT INTO clientes (nombre, documento, telefono, direccion, email)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, documento, telefono, direccion, email]
    );

    res.json({
      id: result.insertId,
      nombre,
      documento,
      telefono,
      direccion,
      email,
      estado: 1,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar cliente
const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, documento, telefono, direccion, email, estado } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE clientes 
       SET nombre=?, documento=?, telefono=?, direccion=?, email=?, estado=? 
       WHERE id = ?`,
      [nombre, documento, telefono, direccion, email, estado, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Cliente no encontrado" });

    res.json({ message: "Cliente actualizado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar cliente (soft delete)
const deleteCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "UPDATE clientes SET estado = 0 WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Cliente no encontrado" });

    res.json({ message: "Cliente eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Exportación correcta
export default {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
};
