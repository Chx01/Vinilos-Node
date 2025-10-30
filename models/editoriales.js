const { DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/database");

class Editorial extends Model {
  static associate(models) {
    this.hasMany(models.Vinilo, { foreignKey: "editorialId", as: "vinilos" });
  }
}

Editorial.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  sequelize,
  modelName: "Editorial",
  tableName: "editoriales",
  timestamps: true,
  paranoid: true
});

module.exports = Editorial;

/**
 * @swagger
 * components:
 *   schemas:
 *     Editoriales:
 *        type: object
 *        required:
 *          -nombre
 *        properties:
 *          nombre:
 *            type: string
 *            description: El nombre de la editorial.
 *        example:
 *            nombre: Vinilos Enterprice
 *           
 */