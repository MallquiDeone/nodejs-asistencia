CREATE DATABASE db_asistencia;

/*****  TABLA USUARIO *****/
/*************************/
CREATE TABLE tblUsuario(
	usuario_id INT AUTO_INCREMENT,
	tUsuario TEXT,
    tContrasena TEXT,
    rol_id INT,
    tNombre VARCHAR(30),
    tApellido VARCHAR(30),
    PRIMARY KEY(usuario_id),
    FOREIGN KEY(rol_id) REFERENCES tblRoles(rol_id)
);

/*****  TABLA ESTUDIANTE *****/
/*************************/
CREATE TABLE tblEstudiante(
	estudiante_id INT AUTO_INCREMENT,
    cDni CHAR(8) UNIQUE NOT NULL,
    vNombres VARCHAR(50) NOT NULL,
    vApellido_p VARCHAR(50) NOT NULL,
    vApellido_m VARCHAR(50) NOT NULL,
    url TEXT,
    public_id TEXT,
    estado INT DEFAULT 0,
    PRIMARY KEY(estudiante_id)
);