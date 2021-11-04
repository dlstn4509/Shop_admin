const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const boardinit = require('../../middlewares/boardinit-mw');
const uploader = require('../../middlewares/multer-mw');
const afterUploader = require('../../middlewares/after-multer-mw');
const { Board, BoardFile } = require('../../models');
const numeral = require('numeral');
const pager = require('../../middlewares/pager-mw');

// 신규글 작성 화면
router.get('/', boardinit('query'), (req, res, next) => {
  const { type } = req.query;
  if (type === 'create') {
    res.render('admin/board/board-form', { type });
  } else next();
});
// 리스트
router.get('/', boardinit('query'), pager(Board), async (req, res, next) => {
  try {
    const { type, field = 'id', search = '', sort = 'desc' } = req.query;
    // req.query.field = field;
    // req.query.search = search;
    // req.query.boardId = 1;
    const lists = await Board.searchList(req.query, req.pager, BoardFile);
    res.render('admin/board/board-list', {
      type,
      lists,
      numeral,
      pager: req.pager,
      field,
      sort,
      search,
    });
  } catch (err) {
    next(createError(err));
  }
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
  afterUploader(['img', 'pds']), // db저장하기 전 정리
  boardinit('body'), // req.body 정리
  async (req, res, next) => {
    try {
      req.body.user_id = 1; // 임시, 회원작업 후 수정 예정
      req.body.binit_id = res.locals.boardId;
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
