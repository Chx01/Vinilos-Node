const Membresia = require("../models/membresia");

const membresiaController = {
  async getAll() {
    return await Membresia.findAll({ include: "socio" });
  },

  async getById(id) {
    const membresia = await Membresia.findByPk(id, { include: "socio" });
    if (!membresia) throw new Error("Membresía no encontrada");
    return membresia;
  },

  async create(data) {
    return await Membresia.create(data);
  },

  async update(id, data) {
    const membresia = await Membresia.findByPk(id);
    if (!membresia) throw new Error("Membresía no encontrada");

    await membresia.update(data);
    return membresia;
  },

  async remove(id) {
    const membresia = await Membresia.findByPk(id);
    if (!membresia) throw new Error("Membresía no encontrada");

    await membresia.destroy();
    return { message: "Membresía eliminada correctamente" };
  }
};

module.exports = membresiaController;