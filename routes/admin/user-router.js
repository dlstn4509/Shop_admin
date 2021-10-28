const path = require('path');
const express = require('express');
const router = express.Router();
const { error, telNumber } = require('../../modules/util');

// 회원 리스트
router.get('/', (req, res, next) => {
  res.render('admin/user/user-list', { css: 'admin-user' });
});
// 회원 수정 화면
router.get('/:id', (req, res, next) => {
  // type 분기
  res.render('admin/user/user-update', { css: 'admin-user', telNumber });
});
// 회원 수정
router.put('/', (req, res, next) => {
  res.send('admin/user:PUT');
});
// 회원 삭제
router.delete('/', (req, res, next) => {
  res.send('admin/user:DELETE');
});

module.exports = { name: '/user', router };
