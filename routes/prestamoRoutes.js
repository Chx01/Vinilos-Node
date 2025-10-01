const express = require("express");
const router = express.Router();
const prestamoController = require("../controllers/prestamoController");

/**
 * @swagger
 * /prestamos:
 *   get:
 *     summary: Obtiene una lista de todas los prestamos
 *     responses:
 *       200:
 *         description: Una lista de prestamos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                
 */
router.get("/", async (req, res, next) => {
  try {
    const data = await prestamoController.getAll();
  if(!data) {
    throw new AppError("No se encontraron prestamos", 400);
  }
  res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /prestamos/{id}:
 *   get:
 *     summary: Obtiene los detalles de un prestamo en específico por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del prestamo
 *     responses:
 *       200:
 *         description: Los detalles del prestamo
 *         content:
 *           application/json:
 *             schema:              
 *                
 *       404:
 *          description: Prestamo no encontrada
 */
router.get("/:id", async (req, res, next) => {
  try {
    const data = await prestamoController.getById(req.params.id);
  if(!data) {
    throw new AppError("No se encontró el prestamo", 400);
  }
  res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /prestamos/create:
 *   post:
 *     summary: Crea un nuevo prestamo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              
 *     responses:
 *       200:
 *         description: El prestamo se ha creado con éxito
 *         content:
 *           application/json:
 *             schema:     
 *               
 *       500:
 *          description: Error al crear el prestamo 
 */
router.post("/", async (req, res) => {
  try {
    const data = await prestamoController.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /prestamos/{id}:
 *   put:
 *     summary: Actualiza un prestamo por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del prestamo a actualizar
 *     responses:
 *       200:
 *         description: El prestamo se ha actualizado con éxito
 *       500:
 *         description: Error al actualizar el prestamo o el prestamo no existe
 */
router.put("/:id", async (req, res) => {
  try {
    const data = await prestamoController.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /prestamos/{id}:
 *   delete:
 *     summary: Elimina un prestamo por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del prestamo a eliminar
 *     responses:
 *         200:
 *           description: El prestamo se ha eliminado con éxito
 *         500:
 *           description: Error al eliminar el prestamo o el prestamo no existe
 */
router.delete("/:id", async (req, res) => {
  try {
    const data = await prestamoController.remove(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;