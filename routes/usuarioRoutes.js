const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const upload = require("../middleware/upload");
const authenticationController = require("../controllers/authenticationController");
const AppError = require("../errors/AppError");
const auth = require("../middleware/auth");
const Usuarios = require("../models/usuarios");
const Rol = require("../models/roles");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene una lista de todas los usuarios
 *     responses:
 *       200:
 *         description: Una lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                
 */
router.get("/", async (req, res, next) => {
  try {
    const data = await usuarioController.getAll();
  if(!data) {
    throw new AppError("No se encontraron usuarios", 400);
  }
  res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtiene los detalles de un usuario en específico por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario
 *     responses:
 *       200:
 *         description: Los detalles de un usuario
 *         content:
 *           application/json:
 *             schema:              
 *                
 *       404:
 *          description: Usuario no encontrado
 */
router.get("/:id", async (req, res, next) => {
  try {
    const data = await usuarioController.getById(req.params.id);
  if(!data) {
    throw new AppError("No se encontró el usuario", 400);
  }
  res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /usuarios/create:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              
 *     responses:
 *       200:
 *         description: El usuario se ha creado con éxito
 *         content:
 *           application/json:
 *             schema:     
 *               
 *       500:
 *          description: Error al crear el usuario 
 */
router.post("/", async (req, res) => {
  try {
    const data = await usuarioController.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario a actualizar
 *     responses:
 *       200:
 *         description: El usuario se ha actualizado con éxito
 *       500:
 *         description: Error al actualizar el usuario o el usuario no existe
 */
router.put("/:id", async (req, res) => {
  try {
    const data = await usuarioController.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario a eliminar
 *     responses:
 *         200:
 *           description: El usuario se ha eliminado con éxito
 *         500:
 *           description: Error al eliminar el usuario o el usuario no existe
 */
router.delete("/:id", async (req, res) => {
  try {
    const data = await usuarioController.remove(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Subida de imagen de usuario
router.post("/:id/imagen", upload.single("imagen"), async (req, res) => {
  try {
    const result = await usuarioController.updateImage(req.params.id, req.file);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Loguearse
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("El correo y la contraseña son obligatorios", 400));
  }
  try {
    const result = await authenticationController.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Loguearse por nombre de usuario (compatibilidad con frontend)
router.post("/login-by-nombre", async (req, res, next) => {
  const { nombre, password } = req.body;
  if (!nombre || !password) {
    return next(new AppError("El usuario y la contraseña son obligatorios", 400));
  }
  try {
    const usuario = await Usuarios.findOne({ where: { nombre }, include: { model: Rol, as: "rol" } });
    if (!usuario) {
      return next(new AppError("El usuario no existe en la base de datos", 401));
    }
    let passwordMatch = false;
    if (usuario.password && usuario.password.startsWith("$2")) {
      passwordMatch = await bcrypt.compare(password, usuario.password);
    } else {
      passwordMatch = usuario.password === password;
    }
    if (!passwordMatch) {
      return next(new AppError("Contraseña Incorrecta", 401));
    }
    const payload = { usuarioId: usuario.id, nombre: usuario.nombre, rolId: usuario.rolId };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    return res.status(200).json({ token, refreshToken, user: { id: usuario.id, nombre: usuario.nombre, rolId: usuario.rolId, rolNombre: usuario.rol ? usuario.rol.nombre : null } });
  } catch (error) {
    next(error);
  }
});

//Cerrar Sesión
router.post("/logout", async (req, res, next) => {
  const { token } = req.body;
  try {
    res.status(200).send("Usted a cerrado sesión");
  } catch (error) {}
});

//Refrescar Token
router.post("/refresh-token", async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return next(new AppError("La autenticación falló: falta refreshToken", 401));
  }
  try {
    const token = await authenticationController.refreshAuthToken(refreshToken);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

// Datos del usuario autenticado
router.get("/me", auth, async (req, res, next) => {
  try {
    const { usuarioId, email, rolId } = req.user;
    res.json({ id: usuarioId, email, rolId });
  } catch (error) {
    next(error);
  }
});

module.exports = router;