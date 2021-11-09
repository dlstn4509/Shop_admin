const path = require('path');
const express = require('express');
const router = express.Router();
const { isAdmin } = require('../../middlewares/auth-mw');

router.get('/', (req, res, next) => {
  if (req.query.type === 'update') {
    res.render('admin/order/order-update');
  } else {
    res.render('admin/order/order-list');
  }
});
router.get('/:id', (req, res, next) => {
  res.render('admin/order/order-form');
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
