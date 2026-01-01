'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let adminRolId = await queryInterface.rawSelect('roles', { where: { nombre: 'Administrador' } }, ['id']);
    if (!adminRolId) {
      adminRolId = uuidv4();
      await queryInterface.bulkInsert('roles', [{
        id: adminRolId,
        nombre: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    }

    await queryInterface.bulkUpdate('usuarios', {
      rolId: adminRolId,
      password: 'admin1234',
      updatedAt: new Date(),
    }, { nombre: 'admin' });
  },

  down: async (queryInterface, Sequelize) => {
    // no-op
  }
};
