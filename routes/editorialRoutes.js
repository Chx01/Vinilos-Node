const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/editorialController");
const AppError = require("../errors/AppError");

/**
 * @swagger
 * /editoriales:
 *   get:
 *     summary: Obtiene una lista de todas las editoriales
 *     responses:
 *       200:
 *         description: Una lista de editoriales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                
 */

router.get("/", async (req, res) => {
  try {
    const data = await editorialController.getAll();  
  if(!data) {
    throw new AppError("No se encontraron editoriales", 400);
  }
  res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /editoriales/{id}:
 *   get:
 *     summary: Obtiene los detalles de una editorial en específico por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la editorial
 *     responses:
 *       200:
 *         description: Los detalles de una editorial
 *         content:
 *           application/json:
 *             schema:              
 *                
 *       404:
 *          description: Editorial no encontrada
 */
router.get("/:id", async (req, res) => {
  try {
    const data = await editorialController.getById(req.params.id);
    if(!data) {
      throw new AppError("No se encontró la editorial", 400);
    }  
    res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /editoriales/create:
 *   post:
 *     summary: Crea un nueva editorial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              
 *     responses:
 *       200:
 *         description: La editorial se ha creado con éxito
 *         content:
 *           application/json:
 *             schema:     
 *               
 *       500:
 *          description: Error al crear la editorial 
 */
router.post("/", async (req, res) => {
  try {
    const data = await editorialController.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /editoriales/{id}:
 *   put:
 *     summary: Actualiza una editorial por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la editorial a actualizar
 *     responses:
 *       200:
 *         description: La editorial se ha actualizado con éxito
 *       500:
 *         description: Error al actualizar la editorial o la editorial no existe
 */
router.put("/:id", async (req, res) => {
  try {
    const data = await editorialController.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /editoriales/{id}:
 *   delete:
 *     summary: Elimina una editorial por su ID
 *     parameters:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la editorial a eliminar
 *     responses:
 *         200:
 *           description: La editorial se ha eliminado con éxito
 *         500:
 *           description: Error al eliminar la editorial o la editorial no existe
 */
router.delete("/:id", async (req, res) => {
  try {
    const data = await editorialController.remove(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;