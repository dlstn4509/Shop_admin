const path = require('path');
const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const passport = require('passport');
const { alert } = require('../../modules/util');

router.get('/login', (req, res, next) => {
  res.render('admin/auth/login');
});
router.post('/login', async (req, res, next) => {
  try {
    const done = (err, user, msg) => {
      if (err) return next(err);
      else if (!user) return res.send(alert(msg));
      else {
        req.logIn(user, (err) => {
          if (err) return next(err);
          else return res.send(alert('로그인 되었습니다.'));
        });
      }
    };
    passport.authenticate('local', done)(req, res, next);
    // 미들웨어를 라우터에서 실행하는 로직
  } catch (err) {
    next(createError(err));
  }
});
router.get('/logout', (req, res, next) => {
  req.logout();
  res.locals.user = null;
  res.send(alert('로그아웃 되었습니다.', '/admin/auth/login'));
});

module.exports = { name: '/auth', router };
