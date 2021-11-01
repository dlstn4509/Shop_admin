'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('board', 'user_id', {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
  // sequelize db:migrate
  // await queryInterface.addColumn('테이블명', '콜렉션이름', 옵션)

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  },
  // sequelize db:migrate:undo
};
