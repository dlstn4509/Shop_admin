const fs = require('fs-extra');
const path = require('path');
const { findChildId, findLastId } = require('../modules/util');
const _ = require('lodash');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const insertCatePrd = [];
    const [jsonFile] = fs.readJsonSync(path.join(__dirname, '../json/tree.json'));
    const cateIds = findLastId(jsonFile, []);
    for (let i = 1; i <= 100; i++) {
      let cates = _.shuffle(cateIds);
      let len = Math.floor(Math.random() * cates.length);
      for (let j = 0; j < len; j++) {
        insertCatePrd.push({
          prd_id: i,
          cate_id: cates[j],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert('cate_product', insertCatePrd);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cate_product', null, {});
  },
};
