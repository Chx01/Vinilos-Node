const express = require("express");
const router = express.Router();
const socioController = require("../controllers/socioController");

/**
 * @swagger
 * /socios:
 *   get:
 *     summary: Obtiene una lista de todos los socios
 *     responses:
 *       200:
 *         description: Una lista de socios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                
 */
router.get("/", async (req, res, next) => {
  try {
    const data = await socioController.getAll();
  if(!data) {
    throw new AppError("No se encontraron socios", 400);
  }
  res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /socios/{id}:
 *   get:
 *     summary: Obtiene los detalles de un socio en específico por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del socio
 *     responses:
 *       200:
 *         description: Los detalles de un socio
 *         content:
 *           application/json:
 *             schema:              
 *                
 *       404:
 *          description: Socio no encontrado
 */
router.get("/:id", async (req, res, next) => {
  try {
    const data = await socioController.getById(req.params.id);
  if(!data) {
    throw new AppError("No se encontró el socio", 400);
  }
  res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /socios/create:
 *   post:
 *     summary: Crea un nuevo socio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              
 *     responses:
 *       200:
 *         description: El socio se ha creado con éxito
 *         content:
 *           application/json:
 *             schema:     
 *               
 *       500:
 *          description: Error al crear el socio 
 */
router.post("/", async (req, res) => {
  try {
    const data = await socioController.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /socios/{id}:
 *   put:
 *     summary: Actualiza un socio por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del socio a actualizar
 *     responses:
 *       200:
 *         description: El socio se ha actualizado con éxito
 *       500:
 *         description: Error al actualizar el socio o el socio no existe
 */
router.put("/:id", async (req, res) => {
  try {
    const data = await socioController.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /socios/{id}:
 *   delete:
 *     summary: Elimina un socio por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del socio a eliminar
 *     responses:
 *         200:
 *           description: El socio se ha eliminado con éxito
 *         500:
 *           description: Error al eliminar el socio o el socio no existe
 */
router.delete("/:id", async (req, res) => {
  try {
    const data = await socioController.remove(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;