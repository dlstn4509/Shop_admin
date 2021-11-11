const path = require('path');
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const escape = require('escape-html');
const { Product } = require('../../models');

router.get('/', (req, res, next) => {
  if (req.query.type === 'create') {
    res.render('admin/prd/prd-form');
  } else next();
});
router.get('/', (req, res, next) => {
  res.render('admin/prd/prd-list');
});
router.get('/:id', (req, res, next) => {
  try {
    res.render('admin/prd/prd-form');
  } catch (err) {
    next(createError(err));
  }
});
router.post('/', async (req, res, next) => {
  try {
    req.body.content = escape(req.body.content);
    await Product.create(req.body);
    // res.redirect('/admin/prd');
  } catch (err) {
    next(createError(err));
  }
});
router.put('/', async (req, res, next) => {
  try {
    res.redirect('/admin/prd');
  } catch (err) {
    next(createError(err));
  }
});
router.delete('/', async (req, res, next) => {
  try {
    res.redirect('/admin/prd');
  } catch (err) {
    next(createError(err));
  }
});

module.exports = { name: '/prd', router };
