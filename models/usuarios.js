const { DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/database");

class Usuario extends Model {
  static associate(models) {
    this.belongsTo(models.Rol, { foreignKey: "rolId", as: "rol" });
  }
}

Usuario.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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
    validate: {
      isEmail: true
    }
  }, /*
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  } */
}, {
  sequelize,
  modelName: "Usuario",
  tableName: "usuarios",
  timestamps: true,
  paranoid: true
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
 *          -password
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
 *            password: 123456
 */