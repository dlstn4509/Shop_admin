'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user', 'tel1', { type: Sequelize.STRING(4) });
    await queryInterface.addColumn('user', 'tel2', { type: Sequelize.STRING(4) });
    await queryInterface.addColumn('user', 'tel3', { type: Sequelize.STRING(4) });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
