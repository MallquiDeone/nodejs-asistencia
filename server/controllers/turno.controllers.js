import { pool } from "../db.js";

export const getTurnos = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM turno");
        res.json(result) ;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const getTurno = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM turno WHERE id_turno = ?",
            [req.params.id]      
        );
        res.json(result) ;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const createTurno = async(req, res) => {
    try {
        const { tipo_turno, hora_limite_entrada } = req.body;
        const [result] = await pool.query("INSERT INTO turno(tipo_turno, hora_limite_entrada) VALUES(?,?)",
            [tipo_turno, hora_limite_entrada]
        )
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//Edpoint para actualizar turno
export const updateTurno = async(req, res) => {
    try {
        const [result] = await pool.query("UPDATE turno SET ? WHERE id_turno = ?",
            [req.body, req.params.id]
        )
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//Edpoint para eliminar turno
export const deleteTurno = async(req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM turno WHERE id_turno = ?",
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