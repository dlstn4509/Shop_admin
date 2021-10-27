const path = require('path');
const express = require('express');
const router = express.Router();
const { error } = require('../../modules/util');

router.get('/', (req, res, next) => {
  res.send('admin/cate');
});
router.post('/', (req, res, next) => {
  res.send('admin/cate:POST');
});
router.put('/', (req, res, next) => {
  res.send('admin/cate:PUT');
});
router.delete('/', (req, res, next) => {
  res.send('admin/cate:DELETE');
});

module.exports = { name: '/cate', router };
