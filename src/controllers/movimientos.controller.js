import { db } from "../config/db.js";

export const createMovimiento = async (req, res) => {
  const { tipo, usuario_id, cliente_id, motivo, detalles } = req.body;

  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    // Insertar movimiento principal
    const [mov] = await conn.query(
      `INSERT INTO movimientos (tipo, usuario_id, cliente_id, motivo)
       VALUES (?, ?, ?, ?)`,
      [tipo, usuario_id, cliente_id || null, motivo]
    );

    const movimientoId = mov.insertId;

    // Insertar items del movimiento
    for (const item of detalles) {
      await conn.query(
        `INSERT INTO movimientos_detalle (movimiento_id, producto_id, cantidad, precio)
         VALUES (?, ?, ?, ?)`,
        [movimientoId, item.producto_id, item.cantidad, item.precio]
      );
    }

    await conn.commit();
    res.json({ message: "Movimiento registrado", id: movimientoId });

  } catch (err) {
    await conn.rollback();
    res.status(500).json({ message: err.message });
  } finally {
    conn.release();
  }
};

// Obtener movimientos
export const getMovimientos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT m.*, u.nombre AS usuario, c.nombre AS cliente
      FROM movimientos m
      LEFT JOIN usuarios u ON m.usuario_id = u.id
      LEFT JOIN clientes c ON m.cliente_id = c.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener movimiento por ID con detalles
export const getMovimientoById = async (req, res) => {
  const { id } = req.params;

  try {
    const [mov] = await db.query("SELECT * FROM movimientos WHERE id = ?", [id]);
    const [det] = await db.query(
      `SELECT md.*, p.nombre 
       FROM movimientos_detalle md
       LEFT JOIN productos p ON md.producto_id = p.id
       WHERE movimiento_id = ?`,
      [id]
    );

    res.json({
      movimiento: mov[0],
      detalles: det
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
