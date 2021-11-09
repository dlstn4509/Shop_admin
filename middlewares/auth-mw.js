const { alert } = require('../modules/util');

const isAdmin = (_status = '7') => {
  return (req, res, next) => {
    if (!req.user && req.path.includes('/auth/login')) next();
    else if (req.user && _status <= req.user.status) next();
    else {
      req.logOut();
      res.send(alert('권한이 없습니다. 로그인 후 이용하세요', '/admin/auth/login'));
    }
  };
};

const isGuest = (req, res, next) => {
  if (req.user) res.send(alert('로그인 상태 입니다.'));
  else next();
};

module.exports = { isAdmin, isGuest };
