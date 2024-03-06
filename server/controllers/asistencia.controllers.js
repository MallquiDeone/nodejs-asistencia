import { pool } from "../db.js";

export const createAsistencia = async (req, res) => {
    try {
        const { dni } = req.body;
        const now = new Date();
        const fecha = now.toISOString().slice(0, 10);
    
        const [existingAttendance] = await pool.query(
          "SELECT * FROM asistencia_general WHERE dni = ? AND fecha = ?",
          [dni, fecha]
        );
    
        if (existingAttendance.length > 0) {
          return res.status(400).json({ message: "Asistencia ya registrada para este estudiante en la fecha actual", success: false });
        }
    
        const hora_entrada = now.toLocaleTimeString();
    
        // Insertar en la tabla asistencia_general
        await pool.query(
          "INSERT INTO asistencia_general (dni, fecha, hora_entrada, hora_salida) VALUES (?, ?, ?, NULL)",
          [dni, fecha, hora_entrada]
        );
    
        // Obtener información del estudiante
        const [studentInfo] = await pool.query(
          "SELECT * FROM estudiantes WHERE dni = ?",
          [dni]
        );
    
        res.status(201).json({ message: "Asistencia registrada exitosamente", success: true, studentInfo: studentInfo[0] });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
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