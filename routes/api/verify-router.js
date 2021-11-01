const path = require('path');
const express = require('express');
const router = express.Router();
const { User } = require('../../models');

router.get('/', async (req, res, next) => {
  // userid, email 중복 검증
  try {
    let { key, value } = req.query;
    // req.query 값은 문자열로 들어옴 typeof -> string
    let where = key === 'userid' ? { userid: value } : { email: value };
    const rs = await User.findAll({ where });
    // const rs = await User.findAll({ where: { userid: 'dlstn4509' }});
    res.status(200).json(!rs.length);
    // !1 = false, !0 = true, validation에서 가져다 씀
  } catch (err) {
    res.status(500).json(err);
  }
});
// http://127.0.0.1:3000/api/verify?key=userid&value=dlstn4509
module.exports = { name: '/verify', router };
