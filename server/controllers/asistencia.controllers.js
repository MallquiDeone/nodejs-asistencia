import { pool } from "../db.js";

export const createAsistencia = async (req, res) => {
    try {
        const { dni } = req.body;
        const now = new Date();
        const fecha = now.toISOString().slice(0, 10);
        const hora_actual = now.toTimeString().slice(0, 8);

        
        // Informacion del estudiante
        const [studentInfo] = await pool.query("SELECT url, nombres, apellido_p, apellido_m, id_grado, id_seccion FROM estudiantes WHERE dni = ?", [dni]);
        console.log(studentInfo);
        if (studentInfo.length === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }
        //brutal

        // Verificar si ya existe un registro para ese dni y fecha
        const [existingResult] = await pool.query("SELECT * FROM asistencia_general WHERE dni = ? AND fecha = ? ORDER BY id_asistencia DESC LIMIT 1", [dni, fecha]);
        if (existingResult.length > 0) {
            if (!existingResult[0].hora_salida) {
                // Actualizar el registro existente con la hora de salida
                await pool.query("UPDATE asistencia_general SET hora_salida = ? WHERE id_asistencia = ?", [hora_actual, existingResult[0].id_asistencia]);
                res.json({ message: 'Hora de salida registrada correctamente.' });
            } else {
                // Insertar un nuevo registro con la hora de entrada
                await pool.query("INSERT INTO asistencia_general(dni, fecha, hora_entrada) VALUES (?, ?, ?)", [dni, fecha, hora_actual]);
                res.json({ message: 'Nuevo registro de hora de entrada registrado correctamente.' });
            }
        } else {
            // Insertar un nuevo registro con la hora de entrada y hora de salida
            await pool.query("INSERT INTO asistencia_general(dni, fecha, hora_entrada, hora_salida) VALUES (?, ?, ?, ?)", [dni, fecha, hora_actual, null]);
            res.json({ message: 'Hora de entrada registrada correctamente.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export const getAsistencias = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM asistencia_general")
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//Edpoint buscar por dni
export const getAsistencia = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM asistencia_general WHERE dni = ?",
            [req.params.id]
        );
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//Edpoint actualizar xdd chuchin 
export const updateAsistencia = async(req, res) => {
    try {
        const [result] = await pool.query("UPDATE asistencia_general SET ? WHERE id_asistencia = ?", 
            [req.body, req.params.id]
        )
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteAsistencia = async(req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM asistencia_general WHERE id_asistencia = ?",
            [req.params.id]
        )
        res.json(result)
    } catch (error) {
        
    }
}
//EDPOINT para los faltones registrar
export const createAsistenciaFalta = async (req, res) => {
    try {
        const { dni, fecha, motivo_salida, estado_asistencia } = req.body
        const [result] = await pool.query("INSERT INTO asistencia_general(dni, fecha, motivo_salida, estado_asistencia) VALUES (?,?,?,?)",
            [dni, fecha, motivo_salida, estado_asistencia]        
        )
        res.json({
            id: result.insertId,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}