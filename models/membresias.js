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