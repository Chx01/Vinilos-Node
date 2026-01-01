'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const exists = await queryInterface.rawSelect('roles', { where: { nombre: 'Administrador' } }, ['id']);
    if (exists) return;

    return queryInterface.bulkInsert('roles', [{
      id: uuidv4(),
      nombre: 'Administrador',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', { nombre: 'Administrador' }, {});
  }
};
