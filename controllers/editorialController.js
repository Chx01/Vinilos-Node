const Editorial = require("../models/editoriales");

const editorialController = {
  async getAll() {
    return await Editorial.findAll({ include: "vinilos" });
  },

  async getById(id) {
    const editorial = await Editorial.findByPk(id, { include: "vinilos" });
    if (!editorial) throw new Error("Editorial no encontrada");
    return editorial;
  },

  async create(data) {
    return await Editorial.create(data);
  },

  async update(id, data) {
    const editorial = await Editorial.findByPk(id);
    if (!editorial) throw new Error("Editorial no encontrada");

    await editorial.update(data);
    return editorial;
  },

  async remove(id) {
    const editorial = await Editorial.findByPk(id);
    if (!editorial) throw new Error("Editorial no encontrada");

    await editorial.destroy();
    return { message: "Editorial eliminada correctamente" };
  }
};

module.exports = editorialController;