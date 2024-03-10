import { Router} from "express";
import { 
    createAsistencia,
    getAsistencias,
    getAsistencia,
    updateAsistencia,
    deleteAsistencia,
    createAsistenciaFalta,
    createPermiso
} from "../controllers/asistencia.controllers.js";

const router = Router();

router.post('/asistencia', createAsistencia)

router.post('/falta', createAsistenciaFalta) //modificado

router.put('/permiso', createPermiso) //Agregado

router.get('/asistencia', getAsistencias)

router.get('/asistencia/:id', getAsistencia)

router.put('/asistencia/:id', updateAsistencia)

router.delete('/asistencia/:id', deleteAsistencia)

export default router;