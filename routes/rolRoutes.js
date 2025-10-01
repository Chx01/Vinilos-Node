const express = require("express");
const router = express.Router();
const rolController = require("../controllers/rolController");

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtiene una lista de todos los roles
 *     responses:
 *       200:
 *         description: Una lista de roles
 *         content:
 *           application/json:
 *             schema:
 *       404:        
 *         description: Rol no encontrado      
 */
router.get("/", async (req, res, next) => {
  try {
    const data = await rolController.getAll();
  if(!data) {
    throw new AppError("No se encontraron roles", 400);
  }
  res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtiene los detalles de un rol en específico por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del rol
 *     responses:
 *       200:
 *         description: Los detalles de un rol
 *         content:
 *           application/json:
 *             schema:              
 *                
 *       404:
 *          description: Rol no encontrado
 */
router.get("/:id", async (req, res, next) => {
  try {
    const data = await rolController.getById(req.params.id);
  if(!data) {
    throw new AppError("No se encontraró el rol", 400);
  }
  res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /roles/create:
 *   post:
 *     summary: Crea un nuevo rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              
 *     responses:
 *       200:
 *         description: El rol se ha creado con éxito
 *         content:
 *           application/json:
 *             schema:     
 *                
 *       500:
 *          description: Error al crear el rol 
 */
router.post("/", async (req, res) => {
  try {
    const data = await rolController.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Actualiza un rol por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del rol a actualizar
 *     responses:
 *       200:
 *         description: El rol se ha actualizado con éxito
 *       500:
 *         description: Error al actualizar el rol o el rol no existe
 */
router.put("/:id", async (req, res) => {
  try {
    const data = await rolController.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Elimina un rol por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del rol a eliminar
 *     responses:
 *         200:
 *           description: El rol se ha eliminado con éxito
 *         500:
 *           description: Error al eliminar el rol o el rol no existe
 */
router.delete("/:id", async (req, res) => {
  try {
    const data = await rolController.remove(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;