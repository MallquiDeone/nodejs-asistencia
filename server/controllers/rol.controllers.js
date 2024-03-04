import { pool } from "../db.js";

export const getRols = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM rol");
        res.json(result) ;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const getRol = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM rol WHERE id_rol = ?",
            [req.params.id]      
        );
        res.json(result) ;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const createRol = async(req, res) => {
    try {
        const { nombre_rol } = req.body;
        const [result] = await pool.query("INSERT INTO rol(nombre_rol) VALUES(?)",
            [nombre_rol]
        )
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//Edpoint para actualizar turno
export const updateRol = async(req, res) => {
    try {
        const [result] = await pool.query("UPDATE rol SET ? WHERE id_rol = ?",
            [req.body, req.params.id]
        )
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//Edpoint para eliminar turno
export const deleteRol = async(req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM rol WHERE id_rol = ?",
            [req.params.id]
        )
        if (result.affectedRows === 0) {
            return res.sendStatus(404);
        }
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}