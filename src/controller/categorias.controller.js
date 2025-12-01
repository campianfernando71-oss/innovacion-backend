import { db } from "../config/db.js";

export const getCategorias = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM categorias");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createCategoria = async (req, res) => {
    const { nombre } = req.body;

    try {
        const [result] = await db.query(
            "INSERT INTO categorias (nombre) VALUES (?)",
            [nombre]
        );

        res.json({ id: result.insertId, nombre });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
