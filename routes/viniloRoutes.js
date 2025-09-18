const express = require("express");
const router = express.Router();
const viniloController = require("../controllers/viniloController");


/**
 * @swagger
 * /vinilos:
 *   get:
 *     summary: Obtiene una lista de todos los vinilos
 *     response:
 *       200:
 *         description: Una lista de vinilos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Vinilo' 
 */

// Obtener todos los vinilos
router.get("/", async (req, res) => {
  try {
    const vinilos = await viniloController.getAll();
    res.json(vinilos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /vinilos/{id}:
 *   get:
 *     summary: Obtiene los detalles de un vinilo en específico por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del vinilo
 *     responses:
 *       200:
 *         description: Los detalles de un vinilo
 *         content:
 *           application/json:
 *             schema:              
 *               $ref: '#/components/schemas/Vinilo' 
 *       404:
 *          description: Vinilo no encontrado
 */
// Obtener un vinilo por ID
router.get("/:id", async (req, res) => {
  try {
    const vinilo = await viniloController.getById(req.params.id);
    res.json(vinilo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /vinilos/create:
 *   post:
 *     summary: Crea un nuevo vinilo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/Vinilos'
 *     responses:
 *       200:
 *         description: El vinilo se ha creado con éxito
 *         content:
 *           application/json:
 *             schema:     
 *               $ref: '#/components/schemas/Vinilo'
 *       500:
 *          description: Error al crear el vinilo 
 */
// Crear vinilo
router.post("/", async (req, res) => {
  try {
    const nuevoVinilo = await viniloController.create(req.body);
    res.status(201).json(nuevoVinilo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /vinilos/{id}:
 *   put:
 *     summary: Actualiza un vinilo por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del vinilo a actualizar
 *     responses:
 *       200:
 *         description: El vinilo se ha actualizado con éxito
 *       500:
 *         description: Error al actualizar el vinilo o el vinilo no existe
 */
// Actualizar vinilo
router.put("/:id", async (req, res) => {
  try {
    const viniloActualizado = await viniloController.update(req.params.id, req.body);
    res.json(viniloActualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /vinilos/{id}:
 *   delete:
 *     summary: Elimina un vinilo por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del vinilo a eliminar
 *     responses:
 *         200:
 *           description: El vinilo se ha eliminado con éxito
 *         500:
 *           description: Error al eliminar el vinilo o el vinilo no existe
 */
// Eliminar vinilo
router.delete("/:id", async (req, res) => {
  try {
    const resultado = await viniloController.remove(req.params.id);
    res.json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;