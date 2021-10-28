const path = require('path');
const express = require('express');
const router = express.Router();
const { error } = require('../../modules/util');

router.get('/', (req, res, next) => {
  res.render('admin/board/board-init', { css: 'admin-board' });
});
router.put('/', (req, res, next) => {
  res.send('admin/binit:PUT');
});
router.delete('/', (req, res, next) => {
  res.send('admin/binit:DELETE');
});
router.post('/init', (req, res, next) => {
  res.send('admin/binit:POST');
});

module.exports = { name: '/binit', router };
