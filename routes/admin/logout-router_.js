const path = require('path');
const express = require('express');
const router = express.Router();
const { error } = require('../../modules/util');

router.get('/', (req, res, next) => {
  res.send('๋ก๊ทธ์์');
});

module.exports = { name: '/logout', router };
