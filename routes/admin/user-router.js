const path = require('path');
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { error, telNumber, alert } = require('../../modules/util');
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// 회원 리스트
router.get('/', (req, res, next) => {
  const ejs = { telNumber, type: req.query.type || '' };
  if (ejs.type === 'create') {
    res.render('admin/user/user-form', ejs);
  } else {
    res.render('admin/user/user-list', ejs);
  }
});
// 회원 수정 화면
router.get('/:id', (req, res, next) => {
  const ejs = { telNumber, type: req.query.type || '' };
  res.render('admin/user/user-form', ejs);
});
// 회원 저장
router.post('/', async (req, res, next) => {
  try {
    const rs = await User.create(req.body);
    console.log(rs);
    res.send(alert('회원가입 완료', '/admin/user'));
  } catch (err) {
    next(createError(err));
  }
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
