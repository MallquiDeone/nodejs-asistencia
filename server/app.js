import express from "express";
import fileUpload from "express-fileupload";
import cookiesParser from "cookie-parser";
import cors from "cors";
//IMPORT ROUTES
import studentsRoutes from "./routes/students.routes.js";
import asistenciaRoutes from "./routes/asistencia.routes.js";
import turnoRoutes from "./routes/turno.routes.js";
import gradoRoutes from "./routes/grado.routes.js";
import seccionRoutes from "./routes/seccion.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import rolRoutes from "./routes/rol.routes.js";

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookiesParser());
//Middlewares
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

app.use("/api", studentsRoutes);
app.use("/api", asistenciaRoutes);
app.use("/api", turnoRoutes);
app.use("/api", gradoRoutes);
app.use("/api", seccionRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", rolRoutes);

export default app;
