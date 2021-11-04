const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const boardinit = require('../../middlewares/boardinit-mw');
const uploader = require('../../middlewares/multer-mw');
const afterUploader = require('../../middlewares/after-multer-mw');
const { Board, BoardFile } = require('../../models');

// 신규글 작성 화면
router.get('/', boardinit('query'), (req, res, next) => {
  const { type } = req.query;
  if (type === 'create') {
    res.render('admin/board/board-form', { type });
  } else next();
});
// 리스트
router.get('/', boardinit('query'), (req, res, next) => {
  const { type } = req.query;
  res.render('admin/board/board-list', { type });
});
// 수정 페이지, 상세 페이지
router.get('/:id', boardinit('query'), (req, res, next) => {
  const { type } = req.query;
  if (type === 'update') {
    res.render('admin/board/board-form', { type });
  } else {
    res.render('admin/board/board-view', { type });
  }
});
// 신규글 저장
router.post(
  '/',
  uploader.fields([{ name: 'img' }, { name: 'pds' }]),
  afterUploader(['img', 'pds']),
  boardinit('body'),
  async (req, res, next) => {
    try {
      req.body.user_id = 1; // 임시, 회원작업 후 수정 예정
      req.body.binit_id = res.locals.boardId; // 임시, 회원작업 후 수정 예정
      const board = await Board.create(req.body);
      req.files.forEach((file) => {
        file.board_id = board.id;
      });
      const files = await BoardFile.bulkCreate(req.files);
      res.redirect('/admin/board?boardId=' + res.locals.boardId);
    } catch (err) {
      next(createError(err));
    }
  }
);
router.put('/', (req, res, next) => {
  res.send('admin/board:PUT');
});
router.delete('/', (req, res, next) => {
  res.send('admin/board:DELETE');
});

module.exports = { name: '/board', router };
