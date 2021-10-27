const path = require('path');
const express = require('express');
const router = express.Router();
const { error } = require('../../modules/util');

router.get('/', (req, res, next) => {
  res.send('admin/user');
});
router.post('/', (req, res, next) => {
  res.send('admin/user:POST');
});
router.put('/', (req, res, next) => {
  res.send('admin/user:PUT');
});
router.delete('/', (req, res, next) => {
  res.send('admin/user:DELETE');
});

module.exports = { name: '/user', router };
