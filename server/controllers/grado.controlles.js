import { pool } from "../db.js";

export const getGrados = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM grado");
        res.json(result) ;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const getGrado = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM grado WHERE id_grado = ?",
            [req.params.id]      
        );
        res.json(result) ;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const createGrado = async(req, res) => {
    try {
        const {nombre_grado} = req.body;
        const [result] = await pool.query("INSERT INTO grado(nombre_grado) VALUES (?)",
            [nombre_grado]
        )
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//Edpoint para actualizar grado
export const updateGrado = async(req, res) => {
    try {
        const [result] = await pool.query("UPDATE grado SET ? WHERE id_grado = ?",
            [req.body, req.params.id]
        )
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//Edpoint para eliminar grado
export const deleteGrado = async(req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM grado WHERE id_grado = ?",
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