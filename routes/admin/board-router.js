const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const queries = require('../../middlewares/query-mw');
const boardInit = require('../../middlewares/boardinit-mw');
const uploader = require('../../middlewares/multer-mw');
const counter = require('../../middlewares/board-counter-mw');
const { isAdmin } = require('../../middlewares/auth-mw');
const afterUploader = require('../../middlewares/after-multer-mw');
const { Board, BoardFile, BoardComment } = require('../../models');
const { moveFile } = require('../../modules/util');

// ---------- 신규글 작성 화면 form ------------------
router.get('/', boardInit(), queries(), (req, res, next) => {
  const { type } = req.query;
  if (type === 'create') {
    res.render('admin/board/board-form', { type });
  } else next();
});
// ---------- 리스트 list ------------------
router.get('/', boardInit(), queries(), async (req, res, next) => {
  try {
    const { sort } = req.query;
    const { lists, pager, totalRecord } = await Board.getLists(req.query, BoardFile);
    res.render('admin/board/board-list', {
      lists,
      pager,
      totalRecord,
      sort,
    });
  } catch (err) {
    next(createError(err));
  }
});
// ---------- 상세수정 update ------------------
router.get('/:id', boardInit(), queries(), counter, async (req, res, next) => {
  const { type } = req.query;
  if (type === 'update') {
    const lists = await Board.findAll({
      where: { id: req.params.id },
      include: [{ model: BoardFile }],
    });
    res.render('admin/board/board-update', { list: Board.getViewData(lists)[0] }); // getViewData -> view page 정리
  } else next();
});

// ---------- 상세보기 view------------------
router.get('/:id', boardInit(), queries(), async (req, res, next) => {
  try {
    const { lists, pager } = await Board.getList(
      req.params.id,
      req.query,
      BoardFile,
      BoardComment
    );
    // res.json({ lists: Board.getViewData(lists)[0], pager });
    res.render('admin/board/board-view', {
      list: Board.getViewData(lists)[0], // getViewData -> view page 정리
      pager,
    });
  } catch (err) {
    next(createError(err));
  }
});
// ---------- 신규글 저장 and 수정 post ------------------
router.post(
  '/',
  uploader.fields([{ name: 'img' }, { name: 'pds' }]),
  // default-form input 중 name="img, pds", req.files에 올려줌
  afterUploader(['img', 'pds']), // db저장하기 전 테이블 이름에 맞게 정리
  boardInit('body'), // req.body 정리
  queries('body'),
  async (req, res, next) => {
    try {
      // 수정
      if (req.body.type === 'update') {
        // await Board.update(req.body, { where: { id: req.body.id } });
        await Board.update(req.body, { where: { id: req.user.id } });
        req.files.forEach((file) => (file.board_id = req.body.id));
        const files = await BoardFile.bulkCreate(req.files);
        res.redirect(res.locals.goList);
      }
      // 저장
      else {
        req.body.user_id = 1; // 임시, 회원작업 후 수정 예정
        req.body.binit_id = res.locals.boardId;
        const board = await Board.create(req.body);
        req.files.forEach((file) => {
          file.board_id = board.id;
        });
        const files = await BoardFile.bulkCreate(req.files);
        res.redirect('/admin/board?boardId=' + res.locals.boardId);
      }
    } catch (err) {
      next(createError(err));
    }
  }
);
// ---------- 삭제 delete ------------------
router.delete('/', isAdmin(8), boardInit(), queries('body'), async (req, res, next) => {
  try {
    await Board.destroy({ where: { id: req.body.id }, truncate: true });
    const files = await BoardFile.findAll({
      attributes: ['saveName'],
      where: { board_id: req.body.id },
    });
    await BoardFile.destroy({ where: { board_id: req.body.id } });
    await BoardComment.destroy({ where: { board_id: req.body.id } });

    for (let { saveName } of files) {
      await moveFile(saveName);
    }
    res.redirect(res.locals.goList);
  } catch (err) {
    next(createError(err));
  }
});

module.exports = { name: '/board', router };
