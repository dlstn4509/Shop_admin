const linkInit = require('../modules/link-init');
module.exports = (req, res, next) => {
  if (req.user) {
    res.locals.user = {
      id: req.user.id,
      userid: req.user.userid,
      username: req.user.username,
      email: req.user.email,
      status: req.user.status,
    };
  } else res.locals.user = null;

  res.locals.user = req.user || null;
  res.locals.init = linkInit.admin;
  res.locals.current = req.path;
  res.locals.currents = req.path.split('/');
  res.locals.currents.shift();
  res.locals.second = '/' + res.locals.currents[0] + '/' + res.locals.currents[1];
  next();
};

// ejs로 보낼 모든것들을 연산함

/* 
current = /admin/board/1
currents = [ 'admin', 'board', '1' ]
second = /admin/board
*/
