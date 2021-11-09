const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const queries = require('../../middlewares/query-mw');
const { isAdmin } = require('../../middlewares/auth-mw');
const { telNumber, alert, getSeparateArray } = require('../../modules/util');
const { User } = require('../../models');

// 회원 등록 화면
router.get('/', isAdmin(8), (req, res, next) => {
  if (req.query.type === 'create') {
    const ejs = { telNumber };
    res.render('admin/user/user-form', ejs);
  } else next();
});
// 회원 리스트 화면
router.get('/', isAdmin(8), queries(), async (req, res, next) => {
  try {
    const { lists, pager, totalRecord } = await User.getLists(req.query);
    // User.findAll, 주소 전화번호 정리
    const ejs = { telNumber, pager, lists, totalRecord };
    res.render('admin/user/user-list', ejs);
  } catch (err) {
    next(createError(err));
  }
});
// 회원 수정 화면
router.get('/:id', isAdmin(8), queries(), async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ where: { id: req.params.id } });
    userInfo.tel = getSeparateArray(userInfo.tel, '-'); // 010-1111-2222 -> 01011112222
    const ejs = { telNumber, userInfo };
    res.render('admin/user/user-update', ejs);
  } catch (err) {
    next(createError(err));
  }
});
// 회원 저장
router.post('/', isAdmin(8), async (req, res, next) => {
  try {
    await User.create(req.body);
    res.send(alert('회원가입 완료', '/admin/user'));
  } catch (err) {
    next(createError(err));
  }
});
// 회원 수정
router.put('/', isAdmin(8), async (req, res, next) => {
  try {
    await User.update(req.body, {
      where: { id: req.body.id },
      individualHooks: true, // beforeUpdate 를 돌아가게 함 (여러 레코드를 수정할때 사용)
    });
    res.send(alert('회원수정이 완료되었습니다.', '/admin/user'));
  } catch (err) {
    next(createError(err));
  }
});
// 회원 삭제
router.delete('/', isAdmin(8), async (req, res, next) => {
  try {
    const { id } = req.body;
    await User.destroy({ where: { id } });
    res.redirect('/admin/user');
  } catch (err) {
    next(createError(err));
  }
});

module.exports = { name: '/user', router };
