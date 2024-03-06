import { Router } from "express";
import { getUsuarios, getUsuario, register, login} from "../controllers/usuario.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/usuario', getUsuarios);

router.get('/usuario/:id', getUsuario);

router.post('/register', register);

router.post('/login', login);

export default router;