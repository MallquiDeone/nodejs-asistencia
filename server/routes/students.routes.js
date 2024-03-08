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

router.get('/estudiante', reporteGeneral);

router.get('/estudiante/:id', getStudent);

router.post('/estudiante', createStudents);

router.put('/estudiante/:id', updateStudents);

router.delete('/estudiante/:id', deleteStudents);

router.get('/reporte/:id', reporteEstudiante);

router.get('/reportes/:id_grado/:id_seccion', reporteGradoSeccion);

router.get('/estudiantes', totalEstudiantes)

export default router;
