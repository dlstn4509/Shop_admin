const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models');

const cb = async (userid, userpw, done) => {
  try {
    const user = await User.loginUser(userid, userpw);
    if (user) done(null, user);
    else done(null, false, '아이디와 패스워드를 확인하세요.');
  } catch (err) {
    done(err);
  }
};

const fields = {
  usernameField: 'userid',
  passwordField: 'userpw',
};

const localStrategy = new LocalStrategy(fields, cb);

module.exports = (passport) => passport.use(localStrategy);
