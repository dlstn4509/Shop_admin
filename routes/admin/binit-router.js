const path = require('path');
const express = require('express');
const router = express.Router();
const { BoardInit } = require('../../models');
const createError = require('http-errors');
const { isAdmin } = require('../../middlewares/auth-mw');
const { alert } = require('../../modules/util');

router.get('/', async (req, res, next) => {
  try {
    const boards = await BoardInit.findAll({ order: [['title', 'asc']] });
    const ejs = { boards };
    res.render('admin/binit/board-init', ejs);
  } catch (err) {
    next(createError(err));
  }
});
router.post('/', async (req, res, next) => {
  try {
    await BoardInit.create(req.body);
    res.send(alert('게시판이 생성되었습니다.', '/admin/binit'));
  } catch (err) {
    next(createError(err));
  }
});
router.put('/', isAdmin(8), async (req, res, next) => {
  try {
    await BoardInit.update(req.body, { where: { id: req.body.id } });
    res.send(alert('게시판이 수정되었습니다.', '/admin/binit'));
  } catch (err) {
    next(createError(err));
  }
});
router.delete('/', isAdmin(8), async (req, res, next) => {
  try {
    await BoardInit.destroy({ where: { id: req.body.id } });
    res.send(alert('게시판이 삭제되었습니다.', '/admin/binit'));
  } catch (err) {
    next(createError(err));
  }
});

module.exports = { name: '/binit', router };
