'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user', 'addrPost', { type: Sequelize.CHAR(5) });
    await queryInterface.addColumn('user', 'addrRoad', { type: Sequelize.STRING(255) });
    await queryInterface.addColumn('user', 'addrJibun', { type: Sequelize.STRING(255) });
    await queryInterface.addColumn('user', 'addrComment', {
      type: Sequelize.STRING(255),
    });
    await queryInterface.addColumn('user', 'addrDetail', { type: Sequelize.STRING(255) });
  },
  // sequelize db:migrate

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  },
  // sequelize db:migrate:undo
};
