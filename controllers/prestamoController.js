const Prestamo = require("../models/prestamo");
const Vinilo = require("../models/vinilo");

const prestamoController = {
  async getAll() {
    return await Prestamo.findAll({ include: ["socio", "vinilo"] });
  },

  async getById(id) {
    const prestamo = await Prestamo.findByPk(id, { include: ["socio", "vinilo"] });
    if (!prestamo) throw new Error("Préstamo no encontrado");
    return prestamo;
  },

  async create(data) {
    const vinilo = await Vinilo.findByPk(data.viniloId);
    if (!vinilo) throw new Error("Vinilo no encontrado");

    if (vinilo.estado === "prestado") throw new Error("El vinilo ya está prestado");

    await vinilo.update({ estado: "prestado" });
    return await Prestamo.create(data);
  },

  async update(id, data) {
    const prestamo = await Prestamo.findByPk(id);
    if (!prestamo) throw new Error("Préstamo no encontrado");

    await prestamo.update(data);
    return prestamo;
  },

  async remove(id) {
    const prestamo = await Prestamo.findByPk(id);
    if (!prestamo) throw new Error("Préstamo no encontrado");

    // devolver vinilo disponible al eliminar el préstamo
    const vinilo = await prestamo.getVinilo();
    if (vinilo) await vinilo.update({ estado: "disponible" });

    await prestamo.destroy();
    return { message: "Préstamo eliminado correctamente" };
  }
};

module.exports = prestamoController;