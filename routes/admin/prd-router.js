const path = require('path');
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { escape, unescape } = require('html-escaper');
const uploader = require('../../middlewares/multer-mw');
const afterUploader = require('../../middlewares/after-multer-mw');
const { Product, ProductFile, CateProduct, Cate } = require('../../models');
const { moveFile } = require('../../modules/util');
const queries = require('../../middlewares/query-mw');

// ---------- 신규 prd 작성 화면 form ------------------
router.get('/', queries(), (req, res, next) => {
  if (req.query.type === 'create') {
    res.render('admin/prd/prd-form');
  } else next();
});
// ---------- prd 리스트 list ------------------
router.get('/', queries(), async (req, res, next) => {
  try {
    const { lists, pager, totalRecord } = await Product.getLists(req.query, ProductFile);
    // res.json({ lists, pager, totalRecord });
    res.render('admin/prd/prd-list', { lists, pager, totalRecord });
  } catch (err) {
    next(createError(err));
  }
});
// ---------- prd 상세수정 화면 ------------------
router.get('/:id', queries(), async (req, res, next) => {
  try {
    const prd = await Product.findProduct(req.params.id, Cate, ProductFile);
    // res.render('admin/prd/prd-update', { prd });
    res.json(prd);
  } catch (err) {
    next(createError(err));
  }
});
// ---------- 신규 prd 저장 post, prd 수정 put ------------------
router.post(
  '/',
  uploader.fields([{ name: 'img' }, { name: 'detail' }]),
  afterUploader(['img', 'detail']),
  queries('body'),
  async (req, res, next) => {
    try {
      if (req.body.type === 'update') {
        // await Board.update(req.body, { where: { id: req.body.id } });
        // req.files.forEach((file) => (file.board_id = req.body.id));
        // const files = await BoardFile.bulkCreate(req.files);
        // res.json({ file: req.files, req: req.body, locals: res.locals });
        // res.redirect(res.locals.goList);
      } else {
        req.body.content = escape(req.body.content);
        const product = await Product.create(req.body);
        req.files.forEach((file) => (file.prd_id = product.id));
        if (req.files.length) await ProductFile.bulkCreate(req.files);
        if (req.body.cate) {
          const catePrd = req.body.cate.split(',').map((cate) => ({
            cate_id: cate,
            prd_id: product.id,
          }));
          if (catePrd.length) await CateProduct.bulkCreate(catePrd);
        }
        res.redirect('/admin/prd');
        // res.json(req.body);
      }
    } catch (err) {
      next(createError(err));
    }
  }
);
// ---------- prd option 수정 put ------------------
router.put('/status', queries('body'), async (req, res, next) => {
  try {
    const { status, id } = req.body;
    await Product.update({ status }, { where: { id } });
    res.redirect(res.locals.goList);
  } catch (err) {
    next(createError(err));
  }
});
// ---------- prd 글 삭제 delete ------------------
router.delete('/', queries('body'), async (req, res, next) => {
  try {
    const { id } = req.body;
    await Product.destroy({ where: { id } });
    const files = await ProductFile.findAll({
      attributes: ['saveName'],
      where: { prd_id: id },
    });
    for (let { saveName } of files) await moveFile(saveName);
    await ProductFile.destroy({ where: { prd_id: id } });
    res.redirect(res.locals.goList);
  } catch (err) {
    next(createError(err));
  }
});

module.exports = { name: '/prd', router };
