const path = require('path');
const express = require('express');
const router = express.Router();
const { error } = require('../../modules/util');

router.get('/', (req, res, next) => {
  if (req.query.type === 'create') {
    res.render('admin/prd/prd-form', { css: 'admin-prd', type: req.query.type });
  } else {
    res.render('admin/prd/prd-list', { css: 'admin-prd' });
  }
});
router.get('/:id', (req, res, next) => {
  res.render('admin/prd/prd-form', { css: 'admin-prd', type: 'update' });
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

module.exports = { name: '/prd', router };
