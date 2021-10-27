const path = require('path');
const express = require('express');
const router = express.Router();
const { error } = require('../../modules/util');

router.get('/', (req, res, next) => {
  res.send('admin/prd');
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
