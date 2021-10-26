const path = require('path');
const express = require('express');
const router = express.Router();
const { error } = require('../../modules/util');
const { pool } = require('../../modules/mysql-init');

router.get('/', (req, res, next) => {});
router.get('/login', (req, res, next) => {});
router.get('/logout', (req, res, next) => {});

module.exports = router;
