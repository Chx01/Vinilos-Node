const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const upload = require("../middleware/upload");

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

module.exports = router;