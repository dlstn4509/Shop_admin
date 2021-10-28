const path = require('path');
const express = require('express');
const router = express.Router();
const { error } = require('../../modules/util');

router.get('/', (req, res, next) => {
  if (req.query.type === 'update') {
    res.render('admin/order/order-form', { css: 'admin-order' });
  } else {
    res.render('admin/order/order-list', { css: 'admin-order' });
  }
});
router.post('/', (req, res, next) => {
  res.send('admin/order:POST');
});
router.put('/', (req, res, next) => {
  res.send('admin/order:PUT');
});
router.delete('/', (req, res, next) => {
  res.send('admin/order:DELETE');
});

module.exports = { name: '/order', router };
