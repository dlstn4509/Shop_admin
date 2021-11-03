const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const numeral = require('numeral');
const { telNumber, alert, getSeparateArray } = require('../../modules/util');
const { User } = require('../../models');
const pager = require('../../middlewares/pager-mw');

// 회원 등록 화면
router.get('/', (req, res, next) => {
  if (req.query.type === 'create') {
    const ejs = { telNumber };
    res.render('admin/user/user-form', ejs);
  } else next();
});
// 회원 리스트 화면
router.get('/', pager(User), async (req, res, next) => {
  try {
    let { field = 'id', search = '', sort = 'desc' } = req.query;
    const users = await User.searchUser(req.query, req.pager);
    const ejs = { telNumber, pager: req.pager, users, field, sort, search, numeral };
    res.render('admin/user/user-list', ejs);
  } catch (err) {
    next(createError(err));
  }
});
// 회원 수정 화면
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    user.tel = getSeparateArray(user.tel, '-');
    const ejs = { telNumber, user };
    res.render('admin/user/user-update', ejs);
  } catch (err) {
    next(createError(err));
  }
});
// 회원 저장
router.post('/', async (req, res, next) => {
  try {
    await User.create(req.body);
    res.send(alert('회원가입 완료', '/admin/user'));
  } catch (err) {
    next(createError(err));
  }
});
// 회원 수정
router.put('/', async (req, res, next) => {
  try {
    const [rs] = await User.update(req.body, {
      where: { id: req.body.id },
      individualHooks: true,
    });
    if (rs) res.send(alert('회원수정이 완료되었습니다.', '/admin/user'));
    else res.send(alert('처리되지 않았습니다.', '/admin/user'));
  } catch (err) {
    next(createError(err));
  }
});
// 회원 삭제
router.delete('/', (req, res, next) => {
  res.send('admin/user:DELETE');
});

module.exports = { name: '/user', router };
