const path = require('path');
const express = require('express');
const router = express.Router();
const { error } = require('../../modules/util');

router.get('/', (req, res, next) => {
  res.send('admin/board');
});
router.post('/', (req, res, next) => {
  res.send('admin/board:POST');
});
router.put('/', (req, res, next) => {
  res.send('admin/board:PUT');
});
router.delete('/', (req, res, next) => {
  res.send('admin/board:DELETE');
});
router.get('/init', (req, res, next) => {
  res.render('admin/board/board-init', { css: 'admin-board' });
});
router.post('/init', (req, res, next) => {
  res.send('admin/board/init:POST');
});

module.exports = { name: '/board', router };
