'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [{
      id: uuidv4(),
      nombre: 'admin',
      password: 'admin1234',
      createdAt: new Date(),
      updatedAt: new Date() 
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};
