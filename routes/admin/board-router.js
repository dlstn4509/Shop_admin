const express = require('express');
const router = express.Router();
const boardinit = require('../../middlewares/boardinit-mw');

// 신규글 작성
router.get('/', boardinit, (req, res, next) => {
  // boardType = default or gallery
  // req.query.type = create or update
  const { type } = req.query;
  if (type === 'create') {
    res.render('admin/board/board-form', { type });
  } else next();
});
// 리스트
router.get('/', boardinit, (req, res, next) => {
  const { type } = req.query;
  res.render('admin/board/board-list', { type });
});
//
router.get('/:id', (req, res, next) => {
  const boardType = req.query.boardType || 'default';
  if (req.query.type === 'update') {
    res.render('admin/board/board-form', { css: 'admin-board', boardType });
  } else {
    res.render('admin/board/board-view', { css: 'admin-board', boardType });
  }
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

module.exports = { name: '/board', router };
