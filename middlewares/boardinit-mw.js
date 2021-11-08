/* 
req.query.boardId -> 현재 게시판 정보
전제 게시판 정보
*/

const _ = require('lodash');
const { BoardInit } = require('../models');

module.exports = (_field = 'query') => {
  return async (req, res, next) => {
    let { boardId } = req[_field];
    const boardLists = await BoardInit.findAll({
      order: [['id', 'asc']],
    });
    const [myBoard] = boardLists.filter((v, i) => {
      // 첫 방문에 boardId가 없으면 첫번째 데이터를 보여줘라
      if (i === 0 && !boardId) boardId = v.id;
      return v.id == boardId;
    });
    req[_field].boardId = boardId;
    req[_field].boardType = myBoard.boardType;
    res.locals.boardLists = _.sortBy(boardLists, 'title');
    res.locals.boardId = boardId;
    res.locals.boardType = myBoard.boardType;
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
