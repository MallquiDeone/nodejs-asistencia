import { Router } from "express";
import {
  getstudents,
  getStudent,
  createStudents,
  updateStudents,
  deleteStudents,
  reporteEstudiante
} from "../controllers/students.controllers.js";

const router = Router();

router.get('/estudiante', getstudents);

router.get('/estudiante/:id', getStudent);

router.post('/estudiante', createStudents);

router.put('/estudiante/:id', updateStudents);

router.delete('/estudiante/:id', deleteStudents);

router.get('/reporte/:id', reporteEstudiante);

export default router;
