const fs = require('fs-extra');
const path = require('path');
const { findAllId } = require('../modules/util');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const insertCate = [];
    const [jsonFile] = fs.readJsonSync(path.join(__dirname, '../json/tree.json'));
    const cateIds = findAllId(jsonFile, []);
    for (let v of cateIds) {
      insertCate.push({
        id: v,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('cate', insertCate);
    // sequelize db:seed --seed 20211105016000-demo-cate.js
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cate', null, {});
  },
};
