import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const getUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuario");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM usuario WHERE id_usuario = ?",
      [req.params.id]
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { usuario, correo, contrasena, id_rol } = req.body;

    const [userFound] = await pool.query(
      "SELECT * FROM usuario WHERE correo = ?",
      [correo]
    );
    if (userFound.length > 0) {
      return res.status(400).json(['Este correo ya esta registrado']);
    }
    

    const contrasenaHash = await bcrypt.hash(contrasena, 10);
    const [result] = await pool.query(
      "INSERT INTO usuario(usuario, correo, contrasena, id_rol) VALUES(?,?,?,?)",
      [usuario, correo, contrasenaHash, id_rol]
    );

    const token = await createAccessToken({ id: result.insertId });
    res.cookie("token", token);
    res.json({
      id: result.insertId,
      usuario,
      correo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;
    const [result] = await pool.query("SELECT usuario, contrasena FROM usuario WHERE usuario = ? AND contrasena = ?",
      [usuario, contrasena]
    );

    if (result.length === 0) {
      // No se encontraron coincidencias, credenciales incorrectas
      return res.status(401).json({ message: "Usuario y/o contraseña incorrectos", success: false });
    }

    // Credenciales correctas
    res.status(200).json({ message: "Credenciales correctas", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};
