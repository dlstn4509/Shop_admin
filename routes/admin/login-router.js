const path = require('path');
const express = require('express');
const router = express.Router();
const { error } = require('../../modules/util');

router.get('/', (req, res, next) => {
  res.send('로그인');
  // res.render('admin/auth/login', { css: 'admin-main' });
});
router.post('/', (req, res, next) => {
  res.send('로그아웃');
});

module.exports = { name: '/login', router };
