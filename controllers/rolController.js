const Rol = require("../models/roles");

const rolController = {
  async getAll() {
    return await Rol.findAll();
  },

  async getById(id) {
    const rol = await Rol.findByPk(id);
    if (!rol) throw new Error("Rol no encontrado");
    return rol;
  },

  async create(data) {
    return await Rol.create(data);
  },

  async update(id, data) {
    const rol = await Rol.findByPk(id);
    if (!rol) throw new Error("Rol no encontrado");

    await rol.update(data);
    return rol;
  },

  async remove(id) {
    const rol = await Rol.findByPk(id);
    if (!rol) throw new Error("Rol no encontrado");

    await rol.destroy();
    return { message: "Rol eliminado correctamente" };
  }
};

module.exports = rolController;