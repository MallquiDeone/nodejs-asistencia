import { Router } from "express";
import { getRols, getRol, createRol, updateRol, deleteRol } from "../controllers/rol.controllers.js";

const router = Router();

router.get('/rol', getRols);

router.get('/rol/:id', getRol);

router.post('/rol', createRol);

router.put('/rol/:id', updateRol)

router.delete('/rol/:id', deleteRol)

export default router;