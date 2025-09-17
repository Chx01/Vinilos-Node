const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const Membresia = require("./membresias");
const Vinilo = require("./vinilos");
const Prestamo = require("./prestamos");

const Socio = sequelize.define("socios", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  paranoid: true,
});

// 1 a 1 con Membresía
Socio.hasOne(Membresia, {
  foreignKey: "socioId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Membresia.belongsTo(Socio, {
  foreignKey: "socioId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// M a M con Vinilo mediante Prestamo
Socio.belongsToMany(Vinilo, {
  through: Prestamo,
  foreignKey: "socioId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
Vinilo.belongsToMany(Socio, {
  through: Prestamo,
  foreignKey: "viniloId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

module.exports = Socio;