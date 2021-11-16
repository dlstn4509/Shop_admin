const path = require('path');
const express = require('express');
const router = express.Router();
const { error } = require('../../modules/util');

router.get('/', (req, res, next) => {
  res.render('admin/cate/cate');
});

module.exports = { name: '/cate', router };
