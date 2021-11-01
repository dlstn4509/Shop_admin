const path = require('path');
const express = require('express');
const router = express.Router();
const { User } = require('../../models');

router.get('/', async (req, res, next) => {
  // userid, email 중복 검증
  try {
    let { key, value } = req.query;
    let where = key === 'userid' ? { userid: value } : { email: value };
    const rs = await User.findAll({ where });
    res.status(200).json(!rs.length);
  } catch (err) {
    res.status(500).json(err);
  }
});
// http://127.0.0.1:3000/api/verify?key=userid&value=dlstn4509
module.exports = { name: '/verify', router };
