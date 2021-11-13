module.exports = {
  up: async (queryInterface, Sequelize) => {
    const insertBinit = [];
    insertBinit.push({
      title: '공지사항',
      boardType: 'default',
      useImg: '3',
      useFile: '2',
      useComment: '0',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    insertBinit.push({
      title: '사용후기',
      boardType: 'gallery',
      useImg: '5',
      useFile: '1',
      useComment: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await queryInterface.bulkInsert('boardinit', insertBinit);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('boardinit', null, {});
  },
};
