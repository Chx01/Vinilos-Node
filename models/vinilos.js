const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

const Vinilo = sequelize.define("vinilos", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artista: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = Vinilo;

/**
 * @swagger
 * components:
 *   schemas:
 *     Vinilo:
 *        type: object
 *        required:
 *          -titulo
 *          -artista
 *          -anio
 *          -genero
 *        properties:
 *          titulo:
 *            type: string
 *            description: El titulo del Vinilo.
 *          artista:
 *            type: string
 *            description: El nombre del artista.
 *          anio:
 *            type: integer
 *            description: El año del Vinilo.
 *          genero:
 *            type: string
 *            description: El género del Vinilo.
 *        example:
 *            titulo: Hey Jude
 *            artista: The Beatles
 *            anio: 1968
 *            genero: Pop
 */