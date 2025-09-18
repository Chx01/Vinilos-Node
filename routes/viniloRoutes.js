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

// Obtener un vinilo por ID
router.get("/:id", async (req, res) => {
  try {
    const vinilo = await viniloController.getById(req.params.id);
    res.json(vinilo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Crear vinilo
router.post("/", async (req, res) => {
  try {
    const nuevoVinilo = await viniloController.create(req.body);
    res.status(201).json(nuevoVinilo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar vinilo
router.put("/:id", async (req, res) => {
  try {
    const viniloActualizado = await viniloController.update(req.params.id, req.body);
    res.json(viniloActualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

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