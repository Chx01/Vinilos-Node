const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

const Membresia = sequelize.define("membresias", {
  tipo: {
    type: DataTypes.ENUM("Basica", "Premium"),
    allowNull: false,
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaExpiracion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = Membresia;

/**
 * @swagger
 * components:
 *   schemas:
 *     Membresia:
 *        type: object
 *        required:
 *          -tipo
 *          -fechaInicio
 *          -fechaExpiracion          
 *        properties:
 *          tipo:
 *            type: enum
 *            description: El tipo de membresía.
 *          fechaInicio:
 *            type: date
 *            description: La fecha de inicio de la membresía.
 *          fechaExpiracion:
 *            type: date
 *            description: La fecha en que expira la membresía.
 *        example:
 *            tipo: Premium
 *            fechaInicio: 17/09/2025
 *            fechaExpiracion: 17/09/2026        
 */