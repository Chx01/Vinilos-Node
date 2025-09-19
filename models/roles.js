const { DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/database");

class Rol extends Model {
  static associate(models) {
    this.hasMany(models.Usuario, { foreignKey: "rolId", as: "usuarios" });
  }
}

Rol.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: "Rol",
  tableName: "roles",
  timestamps: true,
  paranoid: true
});

module.exports = Rol;