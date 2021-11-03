const { BoardInit } = require('../models');
module.exports = async (req, res, next) => {
  const binit = await BoardInit.findOne({
    where: { id: req.query.boardId || 1 },
  });
  res.locals.boardId = req.query.boardId;
  // res.locals.boardType = binit.boardType;
  res.locals.boardType = req.query.boardType ? req.query.boardType : 'default';
  res.locals.boardTitle = binit.title;
  res.locals.useImg = binit.useImg;
  res.locals.useFile = binit.useFile;
  res.locals.useComment = binit.useComment;
  req.binit = binit;
  next();
};

// const { BoardInit } = require('../models');
// module.exports = async (req, res, next) => {
//   const binit = await BoardInit.findOne({ where: { id: req.query.bid } });
//   req.binit = binit;
//   next();
// };

// ----------------- binit -------------
// {
// "id": 1,
// "title": "공지사항",
// "boardType": "default",
// "useImg": "2",
// "useFile": "2",
// "useComment": false,
// "createdAt": "2021-11-03T06:54:51.000Z",
// "updatedAt": "2021-11-03T06:54:51.000Z",
// "deletedAt": null
// }
// -----------------------------------------
