const Vinilo = require("../models/vinilos");

const viniloController = {
  async getAll() {
    return await Vinilo.findAll();
  },

  async getById(id) {
    const vinilo = await Vinilo.findByPk(id);
    if (!vinilo) throw new Error("Vinilo no encontrado");
    return vinilo;
  },

  async create(data) {
    return await Vinilo.create(data);
  },

  async update(id, data) {
    const vinilo = await Vinilo.findByPk(id);
    if (!vinilo) throw new Error("Vinilo no encontrado");

    await vinilo.update(data);
    return vinilo;
  },

  async remove(id) {
    const vinilo = await Vinilo.findByPk(id);
    if (!vinilo) throw new Error("Vinilo no encontrado");

    await vinilo.destroy();
    return { message: "Vinilo eliminado correctamente" };
  }
};

module.exports = viniloController;