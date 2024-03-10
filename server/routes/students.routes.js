import { Router } from "express";
import {
  getStudent,
  createStudents,
  updateStudents,
  deleteStudents,
  reporteEstudiante,
  reporteGradoSeccion,
  reporteGeneral,
  totalEstudiantes
} from "../controllers/students.controllers.js";

const router = Router();

router.get('/estudiante', reporteGeneral); //Reporte general de los estudiantes

router.get('/estudiante/:id', getStudent); //Ver un estudiante por dni

router.post('/estudiante', createStudents); //Registrar un estudiante

router.put('/estudiante/:id', updateStudents); //Actualizar datos de un estudiante por dni

router.delete('/estudiante/:id', deleteStudents); //Eliminar un estudiante por dni

router.get('/reporte/:id', reporteEstudiante);

router.get('/reportes/:id_grado/:id_seccion', reporteGradoSeccion);

router.get('/estudiantes', totalEstudiantes)

export default router;
