const fs = require('fs-extra');
const path = require('path');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comments = [
      '너무 너무 좋아요~',
      '짱 입니다.!!!!!',
      '긁어다 붙이는거 아님!!',
      '테스트 댓글 입니다.',
      '뭐라고 하는게 좋을까요? ~~~~',
      'ㅎㅎㅎ',
    ];
    const insertComment = [];
    for (let i = 1; i <= 240; i++) {
      let limitJ = Math.floor(Math.random() * 50) + 5;
      for (let j = 0; j < limitJ; j++) {
        insertComment.push({
          board_id: i,
          user_id: (i % 100) + 1,
          writer: '데모 유저' + i,
          comment: comments[Math.floor(Math.random() * 6)],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert('boardcomment', insertComment);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('boardcomment', null, {});
  },
};
