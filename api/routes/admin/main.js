const path = require('path');
const express = require('express');
const router = express.Router();
const { error } = require('../../modules/util');
const { findUser, deleteUser } = require('../../models/admin');

router.get('/', async (req, res, next) => {
  try {
    const user = await findUser();
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

module.exports = { name: '/main', router };
