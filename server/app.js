import express from "express";
import fileUpload from "express-fileupload";
//IMPORT ROUTES
import studentsRoutes from "./routes/students.routes.js";
import asistenciaRoutes from "./routes/asistencia.routes.js";
import turnoRoutes from "./routes/turno.routes.js";

const app = express();
//Middlewares
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

app.use(studentsRoutes);
app.use(asistenciaRoutes);
app.use(turnoRoutes);

export default app;
