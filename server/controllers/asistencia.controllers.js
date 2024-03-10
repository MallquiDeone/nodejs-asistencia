import { pool } from "../db.js";

export const createAsistencia = async (req, res) => {
  try {
      const { dni } = req.body;
      const now = new Date();
      const fecha = now.toISOString().slice(0, 10);

      const [existingAttendance] = await pool.query(
        "SELECT * FROM asistencia_general WHERE dni = ? AND fecha = ? ORDER BY id_asistencia DESC LIMIT 1",
        [dni, fecha]
      );

      if (existingAttendance.length > 0 && !existingAttendance[0].hora_salida) {
        // Si ya existe una asistencia para este estudiante en la fecha actual y la hora de salida no está marcada,
        // marcamos la hora de salida y conservamos el estado de asistencia actual
        const [horario] = await pool.query(
          "SELECT salida FROM horario INNER JOIN estudiantes ON horario.id_horario = estudiantes.id_horario WHERE estudiantes.dni = ?",
          [dni]
        );

        if (horario.length > 0 && now < new Date(now.toDateString() + ' ' + horario[0].salida)) {
          return res.status(400).json({ message: "La hora de salida no puede ser antes de la hora de salida programada", success: false });
        }

        await pool.query(
          "UPDATE asistencia_general SET hora_salida = ? WHERE id_asistencia = ?",
          [now, existingAttendance[0].id_asistencia]
        );
        const updatedAttendance = { ...existingAttendance[0], hora_salida: now };
        // Obtener información del estudiante
        const [studentInfo] = await pool.query(
          "SELECT * FROM estudiantes WHERE dni = ?",
          [dni]
        );
        return res.status(200).json({ message: "Hora de salida registrada correctamente", success: true, attendance: updatedAttendance, studentInfo: studentInfo[0] });
      }

      if (existingAttendance.length > 0) {
        return res.status(400).json({ message: "El estudiante ya ha registrado su asistencia para hoy", success: false });
      }

      // Obtener la hora límite del horario para el estudiante
      const [horario] = await pool.query(
        "SELECT hora_limite FROM horario INNER JOIN estudiantes ON horario.id_horario = estudiantes.id_horario WHERE estudiantes.dni = ?",
        [dni]
      );

      let estado_asistencia = 1;
      if (horario.length > 0) {
        const horaLimite = new Date(now.toDateString() + ' ' + horario[0].hora_limite);
        if (now >= horaLimite) {
          estado_asistencia = 2;
        }
      }

      // Insertar en la tabla asistencia_general
      await pool.query(
        "INSERT INTO asistencia_general (dni, fecha, hora_entrada, hora_salida, estado_asistencia) VALUES (?, ?, ?, NULL, ?)",
        [dni, fecha, now, estado_asistencia]
      );

      // Obtener información del estudiante
      const [studentInfo] = await pool.query(
        "SELECT * FROM estudiantes WHERE dni = ?",
        [dni]
      );

      res.status(201).json({ message: "Asistencia registrada correctamente", success: true, studentInfo: studentInfo[0] });
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
        const [result] = await pool.query("INSERT INTO asistencia_general(dni, fecha, motivo_salida, estado_asistencia) VALUES (?,?,?,0)",
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

//Para los que piden permiso
export const createPermiso = async (req, res) => {
  try {
    const { dni, motivo_salida, estado_asistencia } = req.body;
    const now = new Date();
    const fecha = now.toISOString().slice(0, 10);

    const [existingAttendance] = await pool.query(
      "SELECT * FROM asistencia_general WHERE dni = ? AND fecha = ? ORDER BY id_asistencia DESC LIMIT 1",
      [dni, fecha]
    );

    if (existingAttendance.length > 0 && !existingAttendance[0].hora_salida) {
      // Si ya existe una asistencia para este estudiante en la fecha actual y la hora de salida no está marcada,
      // actualizamos la hora de salida y conservamos el estado de asistencia actual
      await pool.query(
        "UPDATE asistencia_general SET hora_salida = ?, motivo_salida = ?, estado_asistencia = ? WHERE id_asistencia = ?",
        [now, motivo_salida, estado_asistencia, existingAttendance[0].id_asistencia]
      );
      const updatedAttendance = { ...existingAttendance[0], hora_salida: now, motivo_salida, estado_asistencia };
      // Obtener información del estudiante
      const [studentInfo] = await pool.query(
        "SELECT * FROM estudiantes WHERE dni = ?",
        [dni]
      );
      return res.status(200).json({ message: "Hora de salida registrada correctamente", success: true, attendance: updatedAttendance, studentInfo: studentInfo[0] });
    }

    res.status(200).json({ message: "No se registró ninguna asistencia nueva", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};


