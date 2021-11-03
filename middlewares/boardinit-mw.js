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
  next();
};

const { BoardInit } = require('../models');
module.exports = async (req, res, next) => {
  const binit = await BoardInit.findOne({ where: { id: req.query.bid } });
  req.binit = binit;
  next();
};
