import { db } from "../config/db.js";
import bcrypt from "bcryptjs";

export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM usuarios WHERE estado = 1");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
            [nombre, email, hash, rol]
        );

        res.json({ id: result.insertId, nombre, email, rol });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
