const path = require('path');
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const escape = require('escape-html');
const { Product } = require('../../models');

// ---------- 신규 prd 작성 화면 form ------------------
router.get('/', (req, res, next) => {
  if (req.query.type === 'create') {
    res.render('admin/prd/prd-form');
  } else next();
});
// ---------- prd 리스트 list ------------------
router.get('/', (req, res, next) => {
  res.render('admin/prd/prd-list');
});
// ---------- prd 상세수정 화면 ------------------
router.get('/:id', (req, res, next) => {
  try {
    res.render('admin/prd/prd-form');
  } catch (err) {
    next(createError(err));
  }
});
// ---------- 신규 prd 저장 post ------------------
router.post('/', async (req, res, next) => {
  try {
    req.body.content = escape(req.body.content);
    await Product.create(req.body);
    // res.redirect('/admin/prd');
  } catch (err) {
    next(createError(err));
  }
});
// ---------- prd 수정 put ------------------
router.put('/', async (req, res, next) => {
  try {
    res.redirect('/admin/prd');
  } catch (err) {
    next(createError(err));
  }
});
// ---------- prd 글 삭제 delete ------------------
router.delete('/', async (req, res, next) => {
  try {
    res.redirect('/admin/prd');
  } catch (err) {
    next(createError(err));
  }
});

module.exports = { name: '/prd', router };
