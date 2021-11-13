const fs = require('fs-extra');
const path = require('path');
const { findChildId } = require('../modules/util');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const insertCate = [];
    const [jsonFile] = fs.readJsonSync(path.join(__dirname, '../json/tree.json'));
    const cateIds = findChildId(jsonFile, []);
    for (let v of cateIds) {
      insertCate.push({
        id: v,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('cate', insertCate);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cate', null, {});
  },
};
