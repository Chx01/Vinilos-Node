const Usuario = require("../models/usuarios");

const usuarioController = {
  async getAll() {
    return await Usuario.findAll();
  },

  async getById(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error("Usuario no encontrado");
    return usuario;
  },

  async create(data) {
    return await Usuario.create(data);
  },

  async update(id, data) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error("Usuario no encontrado");

    await usuario.update(data);
    return usuario;
  },

  async remove(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error("Usuario no encontrado");

    await usuario.destroy();
    return { message: "Usuario eliminado correctamente" };
  }
};

module.exports = usuarioController;