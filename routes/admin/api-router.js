const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { moveFile } = require('../../modules/util');
const db = require('../../models');

// view page 파일 삭제
router.delete('/file/:id', async (req, res, next) => {
  try {
    const modelName = req.query.modelName || 'BoardFile';
    const { id } = req.params;
    const { saveName } = await db[modelName].findOne({
      where: { id },
      attributes: ['saveName'],
    });
    await db[modelName].destroy({ where: { id } });
    await moveFile(saveName);
    res.status(200).json({ code: 200, result: 'success' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { name: '/api', router };
