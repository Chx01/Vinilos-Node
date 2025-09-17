const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

const Usuario = sequelize.define("usuarios", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }, /*
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("admin", "staff"),
    allowNull: false,
  }, */
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = Usuario;

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *        type: object
 *        required:
 *          -nombre
 *          -email
 *        properties:
 *          nombre:
 *            type: string
 *            description: El nombre del usuario.
 *          email:
 *            type: string
 *            description: El gmail del usuario.
 *        example:
 *            nombre: Chx01
 *            email: chri1994@gmail.com
 */