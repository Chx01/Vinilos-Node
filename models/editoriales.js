const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const Vinilo = require("./vinilos");

const Editorial = sequelize.define("editoriales", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  paranoid: true,
});

// 1 a Muchos con Vinilo
Editorial.hasMany(Vinilo, {
  foreignKey: "editorialId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Vinilo.belongsTo(Editorial, {
  foreignKey: "editorialId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

module.exports = Editorial;