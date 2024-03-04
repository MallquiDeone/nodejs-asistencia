DROP DATABASE IF EXISTS db_asistencia;

CREATE DATABASE db_asistencia;
USE db_asistencia;
/*****  TABLA ROL *****/
/*************************/
CREATE TABLE rol(
	id_rol INT AUTO_INCREMENT,
    nombre_rol VARCHAR(40) NOT NULL,
    PRIMARY KEY(id_rol)
);
/*****  TABLA USUARIO *****/
/*************************/
CREATE TABLE usuario(
	id_usuario INT AUTO_INCREMENT,
    usuario VARCHAR(40) NOT NULL,
    correo VARCHAR(40) NOT NULL UNIQUE,
    contrasena VARCHAR(200) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_rol INT,
    PRIMARY KEY(id_usuario),
    FOREIGN KEY(id_rol) REFERENCES rol(id_rol)
);
INSERT INTO usuario (usuario, correo, contrasena)

CREATE TABLE turno(
    id_turno INT AUTO_INCREMENT,
    tipo_turno VARCHAR(50),
    hora_limite_entrada TIME,
    PRIMARY KEY(id_turno)
);
TRUNCATE TABLE turno;
INSERT INTO turno (tipo_turno, hora_limite_entrada) VALUES ('Temprano', '08:00:00');
CREATE TABLE grado(
	id_grado INT AUTO_INCREMENT,
    nombre_grado VARCHAR(50),
    PRIMARY KEY(id_grado)
);
INSERT INTO grado (nombre_grado) VALUES ("1");
INSERT INTO grado (nombre_grado) VALUES ("2");
INSERT INTO grado (nombre_grado) VALUES ("3");
INSERT INTO grado (nombre_grado) VALUES ("4");
INSERT INTO grado (nombre_grado) VALUES ("5");
CREATE TABLE seccion(
	id_seccion INT AUTO_INCREMENT,
    nombre_seccion VARCHAR(50),
    PRIMARY KEY(id_seccion)
);
INSERT INTO seccion(nombre_seccion ) VALUES ("A");
INSERT INTO seccion(nombre_seccion ) VALUES ("B");
CREATE TABLE estudiantes(
    dni INT,
    nombres VARCHAR(50) NOT NULL,
    apellido_p VARCHAR(50) NOT NULL,
    apellido_m VARCHAR(50) NOT NULL,
    sexo CHAR(1) NOT NULL,
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

INSERT INTO estudiantes (dni, nombres, apellido_p, apellido_m, sexo, numero_cel, url, public_id, id_turno, id_grado, id_seccion) VALUES
(123456, 'Juan', 'Pérez', 'Gómez', 'M', 987654321, 'url_imagen_juan', 'public_id_juan', 1, 1, 1),
(234567, 'María', 'González', 'López', 'F', 987654322, 'url_imagen_maria', 'public_id_maria', 1, 1, 1),
(345678, 'Pedro', 'Martínez', 'Sánchez', 'M', 987654323, 'url_imagen_pedro', 'public_id_pedro', 1, 2, 2),
(456789, 'Ana', 'Rodríguez', 'Fernández', 'F',987654324, 'url_imagen_ana', 'public_id_ana', 1, 2, 2),
(567890, 'Luis', 'Hernández', 'Pérez', 'M',987654325, 'url_imagen_luis', 'public_id_luis', 1, 1, 1),
(678901, 'Laura', 'Gómez', 'Martínez', 'F',987654326, 'url_imagen_laura', 'public_id_laura', 1, 2, 2),
(789012, 'Carlos', 'Sánchez', 'González', 'M',987654327, 'url_imagen_carlos', 'public_id_carlos', 1, 3, 2),
(890123, 'Sofía', 'López', 'Hernández', 'F',987654328, 'url_imagen_sofia', 'public_id_sofia', 1, 3, 1),
(901234, 'Pablo', 'Fernández', 'Rodríguez', 'M',987654329, 'url_imagen_pablo', 'public_id_pablo', 1, 3, 1),
(123789, 'Carmen', 'García', 'Jiménez', 'F',987654330, 'url_imagen_carmen', 'public_id_carmen', 1, 5, 2);

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
CREATE TABLE grado_seccion (
	id_grado_seccion INT AUTO_INCREMENT,
    id_grado INT,
	id_seccion INT,
    PRIMARY KEY(id_grado_seccion),
    FOREIGN KEY (id_grado) REFERENCES grado (id_grado),
    FOREIGN KEY (id_seccion) REFERENCES seccion (id_seccion)
);

#SABER DE UN ESTUDIANTE SU ULTIMA ASISTENCIA CON FECHA Y HORA 
SELECT dni, fecha, hora_entrada, hora_salida, estado_asistencia
FROM asistencia_general
WHERE dni = 456789 
ORDER BY fecha DESC, hora_entrada DESC
LIMIT 1;

#BUSCAR ASISTENCIA DE UN GRADO Y SECCION ESPECIFICO 
SELECT e.dni, e.nombres, e.apellido_p, e.apellido_m, a.fecha, a.hora_entrada, a.hora_salida, a.estado_asistencia
FROM estudiantes e
JOIN grado g ON e.id_grado = g.id_grado
JOIN seccion s ON e.id_seccion = s.id_seccion
JOIN asistencia_general a ON e.dni = a.dni
WHERE g.nombre_grado = '3' AND s.nombre_seccion = 'A';


#BUSCAR A UN ESTUDIANTE EN ESPECIFICO CON TODAS SUS ASISTENCIA
SELECT e.nombres, e.apellido_p, e.apellido_m, a.fecha ,a.hora_entrada, a.hora_salida, a.motivo_salida
FROM estudiantes AS e
INNER JOIN asistencia_general AS a
ON e.dni = a.dni
WHERE e.dni = 890123;


#BUSCAR TODAS LAS ASISTENCIA EN GENERAL
SELECT e.dni, e.nombres, e.apellido_p, e.apellido_m, a.fecha ,a.hora_entrada, a.hora_salida, a.motivo_salida
FROM estudiantes AS e
INNER JOIN asistencia_general AS a
ON e.dni = a.dni;


#BUSCAR A UN ESTUDIANTE QUE ASISTIO DE TAL FECHA A TAL FECHA
SELECT e.nombres, e.apellido_p, e.apellido_m, a.fecha, a.hora_entrada, a.hora_salida
FROM estudiantes AS e
INNER JOIN asistencia_general AS a
ON e.dni = a.dni
WHERE e.dni = 456789 AND a.fecha BETWEEN '2024-03-03' AND '2024-03-07';


SELECT * FROM estudiantes;
SELECT * FROM asistencia_general;
SELECT * FROM grado_seccion;



