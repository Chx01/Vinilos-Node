const { DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/database");
const bcrypt = require("bcrypt");

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
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize,
  modelName: "Usuario",
  tableName: "usuarios",
  timestamps: true,
  paranoid: true,
  hooks: {
    async beforeCreate(usuario) {
      if (usuario.password) {
        usuario.password = await bcrypt.hash(usuario.password, 10);
      }
    },
    async beforeUpdate(usuario) {
      if (usuario.changed("password")) {
        usuario.password = await bcrypt.hash(usuario.password, 10);
      }
    },
  }
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