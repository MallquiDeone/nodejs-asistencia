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




