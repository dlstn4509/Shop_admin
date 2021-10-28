const path = require('path');
const express = require('express');
const router = express.Router();
const { error } = require('../../modules/util');

router.get('/', (req, res, next) => {
  if (req.query.type === 'update') {
    res.render('admin/prd/prd-update', { css: 'admin-prd' });
  } else {
    res.render('admin/prd/prd-list', { css: 'admin-prd' });
  }
});
router.post('/', (req, res, next) => {
  res.send('admin/prd:POST');
});
router.put('/', (req, res, next) => {
  res.send('admin/prd:PUT');
});
router.delete('/', (req, res, next) => {
  res.send('admin/prd:DELETE');
});
router.get('/cate', (req, res, next) => {
  res.render('admin/prd/cate-list', { css: 'admin-cate' });
});

module.exports = { name: '/prd', router };
