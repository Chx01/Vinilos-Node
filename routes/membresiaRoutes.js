const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/membresiaController");

/**
 * @swagger
 * /membresias:
 *   get:
 *     summary: Obtiene una lista de todas las membresías
 *     responses:
 *       200:
 *         description: Una lista de membresías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                
 */
router.get("/", async (req, res) => {
  try {
    const data = await membresiaController.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /membresias/{id}:
 *   get:
 *     summary: Obtiene los detalles de una membresía en específico por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la membresía
 *     responses:
 *       200:
 *         description: Los detalles de una membresía
 *         content:
 *           application/json:
 *             schema:              
 *                
 *       404:
 *          description: Membresía no encontrada
 */
router.get("/:id", async (req, res) => {
  try {
    const data = await membresiaController.getById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /membresias/create:
 *   post:
 *     summary: Crea un nueva membresía
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              
 *     responses:
 *       200:
 *         description: La membresía se ha creado con éxito
 *         content:
 *           application/json:
 *             schema:     
 *               
 *       500:
 *          description: Error al crear la membresía 
 */
router.post("/", async (req, res) => {
  try {
    const data = await membresiaController.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /membresias/{id}:
 *   put:
 *     summary: Actualiza una membresía por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la membresía a actualizar
 *     responses:
 *       200:
 *         description: La membresía se ha actualizado con éxito
 *       500:
 *         description: Error al actualizar la membresía o la membresía no existe
 */
router.put("/:id", async (req, res) => {
  try {
    const data = await membresiaController.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /membresias/{id}:
 *   delete:
 *     summary: Elimina una membresía por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la membresía a eliminar
 *     responses:
 *         200:
 *           description: La membresía se ha eliminado con éxito
 *         500:
 *           description: Error al eliminar la membresía o la membresía no existe
 */
router.delete("/:id", async (req, res) => {
  try {
    const data = await membresiaController.remove(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;