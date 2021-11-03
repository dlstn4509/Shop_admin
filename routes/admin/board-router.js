const express = require('express');
const router = express.Router();
const boardinit = require('../../middlewares/boardinit-mw');

// 신규글 작성
router.get('/', boardinit, (req, res, next) => {
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
// 수정 페이지, 상세 페이지
router.get('/:id', boardinit, (req, res, next) => {
  const { type } = req.query;
  if (type === 'update') {
    res.render('admin/board/board-form', { type });
  } else {
    res.render('admin/board/board-view', { type });
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
