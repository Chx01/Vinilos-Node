const { DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/database");


class Socio extends Model {
  static associate(models) {
    this.hasOne(models.Membresia, { foreignKey: "socioId", as: "membresia" });
    this.belongsToMany(models.Vinilo, { through: models.Prestamo, foreignKey: "socioId", as: "vinilos" });
  }
}

Socio.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  }
}, {
  sequelize,
  modelName: "Socio",
  tableName: "socios",
  timestamps: true,
  paranoid: true
});

module.exports = Socio;

/**
 * @swagger
 * components:
 *   schemas:
 *     Socio:
 *        type: object
 *        required:
 *          -nombre
 *          -email
 *          -telefono
 *        properties:
 *          nombre:
 *            type: string
 *            description: El nombre del socio.
 *          email:
 *            type: string
 *            description: El gmail del socio.
 *          telefono:
 *            type: string
 *            description: El teléfono del socio.
 *        example:
 *            nombre: Juan
 *            email: juan98@gmail.com
 *            telefono: 54458793
 */