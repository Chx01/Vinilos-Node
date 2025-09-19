const { DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/database");

class Vinilo extends Model {
  static associate(models) {
    this.belongsTo(models.Editorial, { foreignKey: "editorialId", as: "editorial" });
    this.belongsToMany(models.Socio, { through: models.Prestamo, foreignKey: "viniloId", as: "socios" });
  }
}

Vinilo.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  artista: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  sequelize,
  modelName: "Vinilo",
  tableName: "vinilos",
  timestamps: true,
  paranoid: true
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