const linkInit = require('../modules/link-init');
module.exports = (req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.links = linkInit.admin;
  res.locals.currentPath = req.originalUrl; // -> /admin/prd
  const currentPaths = req.originalUrl.split('/');
  currentPaths.shift();
  res.locals.secondPath = '/' + currentPaths[0];
  res.locals.secondPath += currentPaths[1] ? '/' + currentPaths[1] : ''; // -> /admin/board
  res.locals.currentPaths = currentPaths; // -> [ 'admin', 'prd' ]
  next();
};

// ejs로 보낼 모든것들을 연산함

/* 
currentPath = 현재경로 (originalUrl)
currentPaths = 현재경로 배열
secondPath = /admin/board
*/
