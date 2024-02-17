import { Router } from "express";
import { getTurnos, getTurno, createTurno, updateTurno, deleteTurno } from "../controllers/turno.controllers.js";

const router = Router();

router.get('/turno', getTurnos);

router.get('/turno/:id', getTurno);

router.post('/turno', createTurno);

router.put('/turno/:id', updateTurno)

router.delete('/turno/:id', deleteTurno)

export default router;