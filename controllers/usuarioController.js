const Usuario = require("../models/usuarios");
const fs = require("fs");
const path = require("path");
const Rol = require("../models/roles");

const usuarioController = {
  async getAll() {
    return await Usuario.findAll({ 
    include: {model: Rol, as: "rol"}
  });
  },
  
  async getById(id) {
    const usuario = await Usuario.findByPk(id, { 
    include: {model: Rol, as: "rol"}
  });
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

  async updateImage(id, file) {
    if (!file) throw new Error("No se recibió ningún archivo");

    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error("Usuario no encontrado");

    const uploadsDir = path.join(__dirname, "..", "uploads", "users");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = (file.originalname && path.extname(file.originalname)) || 
                (file.mimetype && file.mimetype.split("/")[1] && `.${file.mimetype.split("/")[1]}`) || 
                "";
    const filename = `${id}-${Date.now()}${ext}`;
    const filepath = path.join(uploadsDir, filename);
    fs.writeFileSync(filepath, file.buffer);

    const publicPath = `/uploads/users/${filename}`;
    await usuario.update({ imagen: publicPath });
    return { id: usuario.id, imagen: publicPath };
  },

  async remove(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error("Usuario no encontrado");

    await usuario.destroy();
    return { message: "Usuario eliminado correctamente" };
  }
};

module.exports = usuarioController;