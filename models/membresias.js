const { DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/database");

class Membresia extends Model {
  static associate(models) {
    this.belongsTo(models.Socio, { foreignKey: "socioId", as: "socio" });
  }
}

Membresia.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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
 *          -limitePrestamos         
 *        properties:
 *          tipo:
 *            type: enum
 *            description: El tipo de membresía.
 *          limitePrestamos:
 *            type: integer
 *            description: El limite de prestamos de la membresía.
 *        example:
 *            tipo: Premium
 *            limitePrestamos: 10        
 */