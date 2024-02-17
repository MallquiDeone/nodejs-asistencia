import { Router } from "express";
import { createSeccion, getSeccion, getSecciones, updateSeccion, deleteSeccion } from "../controllers/seccion.controlles.js";


const router = Router();

router.post('/seccion', createSeccion);

router.get('/seccion', getSecciones);

router.get('/seccion/:id', getSeccion);

router.put('/seccion/:id', updateSeccion);

router.delete('/seccion/:id', deleteSeccion);

export default router;