const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs-extra');

router.get('/', async (req, res, next) => {
  try {
    const tree = await fs.readJson(path.join(__dirname, '../../json/tree.json'));
    res.status(200).json(tree);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const tree = await fs.writeJson(
      path.join(__dirname, '../../json/tree.json'),
      req.body.params.json
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { name: '/tree', router };
