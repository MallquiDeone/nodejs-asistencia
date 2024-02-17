import { pool } from "../db.js";

export const getSecciones = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM seccion");
        res.json(result) ;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const getSeccion = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM seccion WHERE id_seccion = ?",
            [req.params.id]      
        );
        res.json(result) ;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const createSeccion = async(req, res) => {
    try {
        const {nombre_seccion} = req.body;
        const [result] = await pool.query("INSERT INTO seccion(nombre_seccion) VALUES (?)",
            [nombre_seccion]
        )
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//Edpoint para actualizar SECCION
export const updateSeccion = async(req, res) => {
    try {
        const [result] = await pool.query("UPDATE seccion SET ? WHERE id_seccion = ?",
            [req.body, req.params.id]
        )
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//Edpoint para eliminar SECCION
export const deleteSeccion = async(req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM seccion WHERE id_seccion = ?",
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