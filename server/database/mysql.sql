CREATE TABLE turno(
    id_turno INT AUTO_INCREMENT,
    tipo_turno VARCHAR(50),
    hora_limite_entrada TIME,
    PRIMARY KEY(id_turno)
);
INSERT INTO turno (tipo_turno, hora_limite_entrada) VALUES ('Temprano', '08:00:00');
CREATE TABLE grado(
	id_grado INT AUTO_INCREMENT,
    nombre_grado VARCHAR(50),
    PRIMARY KEY(id_grado)
);
INSERT INTO grado (nombre_grado) VALUES ("1");
CREATE TABLE seccion(
	id_seccion INT AUTO_INCREMENT,
    nombre_seccion VARCHAR(50),
    PRIMARY KEY(id_seccion)
);
INSERT INTO seccion (nombre_seccion) VALUES("A");
CREATE TABLE estudiantes(
    dni INT,
    nombres VARCHAR(50) NOT NULL,
    apellido_p VARCHAR(50) NOT NULL,
    apellido_m VARCHAR(50) NOT NULL,
    numero_cel INT,
    url TEXT,
    public_id TEXT,
    id_turno INT NOT NULL,
    id_grado INT NOT NULL,
    id_seccion INT NOT NULL,
    PRIMARY KEY(dni),
    FOREIGN KEY (id_turno) REFERENCES turno(id_turno),
    FOREIGN KEY (id_grado) REFERENCES grado(id_grado),
    FOREIGN KEY (id_seccion) REFERENCES seccion(id_seccion)
);

CREATE TABLE asistencia_general (
    id_asistencia INT AUTO_INCREMENT,
    dni INT NOT NULL,
    fecha DATE NOT NULL DEFAULT (NOW()),
    hora_entrada TIME NOT NULL DEFAULT (NOW()),
    hora_salida TIME,
    motivo_salida VARCHAR(255),
    estado_asistencia INT DEFAULT 1,
    PRIMARY KEY (id_asistencia),
    FOREIGN KEY (dni) REFERENCES estudiantes(dni)
);