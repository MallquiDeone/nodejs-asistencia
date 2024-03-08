import { pool } from "../db.js";

export const getTurnos = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM horario");
        res.json(result) ;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const getTurno = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM horario WHERE id_horario = ?",
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
        const { turno, hora_limite } = req.body;
        const [result] = await pool.query("INSERT INTO horario(turno, hora_limite) VALUES(?,?)",
            [turno, hora_limite]
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
        const [result] = await pool.query("UPDATE horario SET ? WHERE id_horario = ?",
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
        const [result] = await pool.query("DELETE FROM horario WHERE id_horario = ?",
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