const { alert } = require('../modules/util');

const isAdmin = (_status = '7', type = null) => {
  return (req, res, next) => {
    if (!req.user && req.path.includes('/auth/login')) next();
    else if (req.user && _status <= req.user.status) next();
    else {
      let obj =
        req.user && req.user.status == '7'
          ? { msg: '데모유저는 권한이 없습니다.', loc: '' }
          : { msg: '권한이 없습니다. 로그인 후 이용하세요.', loc: '/admin/auth/login' };
      if (type === 'API') res.status(401).json(obj);
      else res.send(alert(obj.msg, obj.loc));
    }
  };
};

const isGuest = (req, res, next) => {
  if (req.user) res.send(alert('로그인 상태 입니다.'));
  else next();
};

module.exports = { isAdmin, isGuest };
