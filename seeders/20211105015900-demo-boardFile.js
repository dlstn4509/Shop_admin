const fs = require('fs-extra');
const path = require('path');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const files = fs.readdirSync(path.join(__dirname, '../storages/211109'));
    files.splice(files.indexOf('thumb'), 1);
    const insertFile = [];
    for (let i = 1; i <= 120; i++) {
      for (let j = 0; j < 3; j++) {
        if (Math.floor(Math.random() * 2) === 0) {
          insertFile.push({
            board_id: i,
            oriName: `파일_${i}_${j}.jpg`,
            saveName: files[Math.floor(Math.random() * files.length)],
            mimeType: 'image/jpg',
            fileType: 'I',
            size: 12369,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    }
    for (let i = 121; i <= 240; i++) {
      for (let j = 0; j < 5; j++) {
        if (Math.floor(Math.random() * 2) === 0) {
          insertFile.push({
            board_id: i,
            oriName: `파일_${i}_${j}.jpg`,
            saveName: files[Math.floor(Math.random() * files.length)],
            mimeType: 'image/jpg',
            fileType: 'I',
            size: 12369,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    }
    await queryInterface.bulkInsert('boardfile', insertFile);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('boardfile', null, {});
  },
};
