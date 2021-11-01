const path = require('path');
const fs = require('fs-extra');
const express = require('express');
const router = express.Router();

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const { name, router: childRouter } = require(path.join(__dirname, file));
    router.use(name, childRouter);
  });

module.exports = router;
