import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

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
    const { correo, contrasena } = req.body;

    // Verificar que correo y contrasena estén definidos
    if (!correo || !contrasena) {
      return res.status(400).json({ message: "Correo y contraseña son requeridos" });
    }

    const [userFound] = await pool.query(
      "SELECT * FROM usuario WHERE correo = ?",
      [correo]
    );

    // Verificar si se encontró un usuario
    if (!userFound || userFound.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(contrasena, userFound[0].contrasena);

    if (!isMatch)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: userFound[0].id_usuario });

    res.cookie("token", token);
    res.json({
      id: userFound[0].id_usuario,
      correo,
      contrasena,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



export const logoutUsuario = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  console.log(req.user);
  //res.send("profile");
  const [userFound] = await pool.query(
    "SELECT * FROM usuario WHERE id_usuario = ?",
    [req.user.id]
  );
  if (!userFound) return res.status(400).json({ message: "User not found" });
  return res.json({
    user: userFound[0],
  })
};


export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const [userFound] = await pool.query(
      "SELECT * FROM usuario WHERE id_usuario = ?",
      [user.id]
    );

    if (!userFound) return res.status(400).json({ message: "User not found" });
    
    return res.json({
      id: userFound[0].id_usuario,
      nombre: userFound[0].usuario, 
      correo: userFound[0].correo
    });
  });
};
