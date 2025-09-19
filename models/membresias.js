const { DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/database");

class Membresia extends Model {
  static associate(models) {
    this.belongsTo(models.Socio, { foreignKey: "socioId", as: "socio" });
  }
}

Membresia.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tipo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  limitePrestamos: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "Membresia",
  tableName: "membresias",
  timestamps: true,
  paranoid: true
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