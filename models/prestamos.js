const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

const Prestamo = sequelize.define("prestamos", {
  fechaPrestamo: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaDevolucion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  estado: {
    type: DataTypes.ENUM("prestado", "devuelto"),
    allowNull: false,
    defaultValue: "prestado",
  },
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = Prestamo;

/**
 * @swagger
 * components:
 *   schemas:
 *     Prestamo:
 *        type: object
 *        required:
 *          -fechaPrestamo
 *          -fechaDevolucion
 *          -estado
 *        properties:
 *          fechaPrestamo:
 *            type: date
 *            description: La fecha en que se hizo el prestamo.
 *          fechaDevolucion:
 *            type: date
 *            description: La fecha de devolución.
 *          estado:
 *            type: enum
 *            description: El estado del prestamo.
 *        example:
 *            fechaPrestamo: 17/09/2025
 *            fechaDevolucion: 17/10/2025
 *            estado: prestado
 */