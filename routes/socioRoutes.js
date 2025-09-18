const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/socioController");

router.get("/", async (req, res) => {
  try {
    const data = await socioController.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await socioController.getById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await socioController.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await socioController.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await socioController.remove(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;