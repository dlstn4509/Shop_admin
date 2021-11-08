const path = require('path');
const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const { error, absPath } = require('../../modules/util');
const { BoardFile } = require('../../models');

router.get('/:id', async (req, res, next) => {
  try {
    const { saveName, oriName } = await BoardFile.findOne({
      attributes: ['saveName', 'oriName'],
      where: { id: req.params.id },
    });
    res.status(200).download(absPath(saveName), oriName);
  } catch (err) {
    next(createError(err));
  }
});

module.exports = { router, name: '/download' };
