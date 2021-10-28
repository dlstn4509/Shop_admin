const linkInit = require('../modules/link-init');
module.exports = (req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.path = {};
  res.locals.path.init = linkInit.admin;
  res.locals.path.current = req.path; // -> /admin/prd
  res.locals.path.currents = req.path.split('/');
  res.locals.path.currents.shift();
  res.locals.path.second = '/' + res.locals.path.currents[0];
  res.locals.path.second += res.locals.path.currents[1]
    ? '/' + res.locals.path.currents[1]
    : '';
  next();
};

// ejs로 보낼 모든것들을 연산함

/* 
currentPath = 현재경로 (originalUrl)
currentPaths = 현재경로 배열
secondPath = /admin/board

currentPath = /admin/board/init
currentPaths = [ 'admin', 'board', 'init' ]
secondPath = /admin/board  or  /admin
*/
