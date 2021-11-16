'use strict';
const numeral = require('numeral');
const { BCRYPT_SALT: salt, BCRYPT_ROUND: rnd } = process.env;
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const insertUsers = [];
    insertUsers.push({
      userid: 'dlstn4509',
      userpw: await bcrypt.hash('111111' + salt, Number(rnd)),
      username: '최고관리자',
      email: 'dlstn7609@hanmail.com',
      tel: `010-4011-8741`,
      addrPost: '12345',
      addrRoad: '서울시 마포구 노고산로',
      addrJibun: '서울시 마포구 창천동',
      addrComment: '(창천동)',
      addrDetail: '7층',
      status: '9',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    insertUsers.push({
      userid: 'admin',
      userpw: await bcrypt.hash('111111' + salt, Number(rnd)),
      username: '최고관리자',
      email: 'admin@dabanbus.com',
      tel: `010-1111-2222`,
      addrPost: '12345',
      addrRoad: '서울시 마포구 노고산로',
      addrJibun: '서울시 마포구 창천동',
      addrComment: '(창천동)',
      addrDetail: '7층',
      status: '7',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    for (let i = 0; i < 99; i++) {
      insertUsers.push({
        userid: 'test' + i,
        userpw: await bcrypt.hash('111111' + salt, Number(rnd)),
        username: '테스트유저' + i,
        email: 'test' + i + '@test.com',
        tel: `010-7777-${numeral(i).format('0000')}`,
        addrPost: String(10000 + i),
        addrRoad: '서울시 마포구 노고산로',
        addrJibun: '서울시 마포구 창천동',
        addrComment: '(창천동)',
        addrDetail: 1 + i + '층',
        status: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('User', insertUsers);
  }, // sequelize db:seed:all

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  }, // sequelize db:seed:undo
};
