const fs = require('fs-extra');
const path = require('path');
const { findLastId, findChildId, findObj } = require('./modules/util');
const [jsonFile] = fs.readJsonSync(path.join(__dirname, './json/tree.json'));
// console.log(jsonFile);
const cateIds = findLastId(jsonFile, []);

console.log(jsonFile);
