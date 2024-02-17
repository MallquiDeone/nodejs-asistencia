import { Router } from "express";
import { createGrado, getGrado, getGrados, updateGrado, deleteGrado } from "../controllers/grado.controlles.js";


const router = Router();

router.post('/grado', createGrado);

router.get('/grado', getGrados);

router.get('/grado/:id', getGrado);

router.put('/grado/:id', updateGrado );

router.delete('/grado/:id', deleteGrado);

export default router;