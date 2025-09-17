const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

const Prestamo = sequelize.define("prestamos", {
  fechaPrestamo: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaDevolucion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  estado: {
    type: DataTypes.ENUM("prestado", "devuelto"),
    allowNull: false,
    defaultValue: "prestado",
  },
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = Prestamo;