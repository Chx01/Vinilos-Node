const Socio = require("../models/socios");

const socioController = {
  async getAll() {
    return await Socio.findAll({ include: "membresia" });
  },

  async getById(id) {
    const socio = await Socio.findByPk(id, { include: "membresia" });
    if (!socio) throw new Error("Socio no encontrado");
    return socio;
  },

  async create(data) {
    return await Socio.create(data);
  },

  async update(id, data) {
    const socio = await Socio.findByPk(id);
    if (!socio) throw new Error("Socio no encontrado");

    await socio.update(data);
    return socio;
  },

  async remove(id) {
    const socio = await Socio.findByPk(id);
    if (!socio) throw new Error("Socio no encontrado");

    await socio.destroy();
    return { message: "Socio eliminado correctamente" };
  }
};

module.exports = socioController;