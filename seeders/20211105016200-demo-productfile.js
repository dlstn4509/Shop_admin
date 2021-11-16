const fs = require('fs-extra');
const path = require('path');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const imgs = fs.readdirSync(path.join(__dirname, '../storages/211109'));
    const details = fs.readdirSync(path.join(__dirname, '../storages/211110'));
    const insertFile = [];
    for (let i = 1; i <= 100; i++) {
      for (let j = 1; j <= 5; j++) {
        insertFile.push({
          prd_id: i,
          oriName: `상품이미지_${i}_${j}.jpg`,
          saveName: imgs[Math.floor(Math.random() * imgs.length)],
          mimeType: 'image/jpg',
          fileType: 'I',
          fieldNum: j,
          size: 12369,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      for (let j = 1; j <= 2; j++) {
        insertFile.push({
          prd_id: i,
          oriName: `상세이미지_${i}_${j}.jpg`,
          saveName: details[Math.floor(Math.random() * details.length)],
          mimeType: 'image/jpg',
          fileType: 'F',
          fieldNum: j,
          size: 12369,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert('productfile', insertFile);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cate', null, {});
  },
};
