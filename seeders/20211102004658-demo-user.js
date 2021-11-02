'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const insertUsers = [];
    for (let i = 0; i < 102; i++) {
      insertUsers.push({
        userid: 'test' + i,
        userpw: '111111',
        username: '테스트유저' + i,
        email: 'test' + i + '@test.com',
        tel1: '010',
        tel2: String(1111 + i),
        tel3: String(2222 + i),
        addrPost: String(10000 + i),
        addrRoad: '서울시 마포구 노고산로',
        addrJibun: '서울시 마포구 창천동',
        addrComment: '(창천동)',
        addrDetail: String(1 + i) + '층',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('User', insertUsers);
  }, // sequelize db:seed:all

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }, // sequelize db:seed:undo
};
