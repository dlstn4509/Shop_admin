/* 
req.query.boardId -> 현재 게시판 정보
전제 게시판 정보
*/

const _ = require('lodash');
const { BoardInit } = require('../models');

module.exports = (field) => {
  // field = query or body
  return async (req, res, next) => {
    let { boardId } = req[field]; // req.query or req.body
    const boardLists = await BoardInit.findAll({
      order: [['id', 'asc']],
    });
    const [myBoard] = boardLists.filter((v, i) => {
      if (i === boardLists.length - 1 && !boardId) boardId = v.id;
      return v.id == boardId;
    });

    res.locals.boardLists = _.sortBy(boardLists, 'title');
    res.locals.boardId = boardId;
    res.locals.boardType = myBoard.boardType;
    // res.locals.boardType = req.query.boardType ? req.query.boardType : 'default';
    res.locals.boardTitle = myBoard.title;
    res.locals.useImg = myBoard.useImg;
    res.locals.useFile = myBoard.useFile;
    res.locals.useComment = myBoard.useComment;
    next();
  };
};
// ----------------- myBoard -------------
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
