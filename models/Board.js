const { dateFormat, relPath } = require('../modules/util');
const numeral = require('numeral');
const createPager = require('../modules/pager-init');
const _ = require('lodash');

module.exports = (sequelize, { DataTypes: DataType, Op }) => {
  const Board = sequelize.define(
    'Board',
    {
      id: {
        type: DataType.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      writer: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      content: {
        type: DataType.TEXT,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      tableName: 'board',
      paranoid: true,
    }
  );
  Board.associate = (models) => {
    // board (多) : user (1)
    Board.belongsTo(models.User, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Board.belongsTo(models.BoardInit, {
      // board (多) : boardinit (1)
      foreignKey: {
        name: 'binit_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Board.hasMany(models.BoardFile, {
      // board (1) : boardfile (多)
      foreignKey: {
        name: 'board_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Board.hasMany(models.BoardComment, {
      // board (1) : boardcomment (多)
      foreignKey: {
        name: 'board_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  // ------- totalRecord 구하기 --------
  Board.getCount = async function (query) {
    return await this.count({
      where: {
        [Op.and]: [{ ...sequelize.getWhere(query) }, { binit_id: query.boardId }],
      },
      // 펼침으로 가져온 이유는 내 글만 가져올 조건(binit_id: query.boardId)을 추가하기 위해
    });
  };

  // ------- view 페이지 보이는 데이터 정리 --------
  Board.getViewData = function (rs, type) {
    const data = rs
      .map((v) => v.toJSON())
      .map((v) => {
        v.files = [];
        v.updatedAt = dateFormat(v.updatedAt, type === 'view' ? 'H' : 'D');
        if (v.BoardFiles.length) {
          for (let file of v.BoardFiles) {
            v.files.push({
              thumbSrc: relPath(file.saveName),
              name: file.oriName,
              id: file.id,
              type: file.fileType,
            });
          }
          v.files = _.sortBy(v.files, ['type']);
        }
        delete v.createdAt;
        delete v.deletedAt;
        delete v.BoardFiles;
        return v;
      });
    return data;
  };

  // ------- 리스트, pager 가져오기 findAll --------
  Board.getLists = async function (query, BoardFile) {
    let { field, sort, boardId, page, boardType } = query;
    // pager
    let listCnt = boardType === 'gallery' ? 12 : 5;
    let pagerCnt = 5;
    const totalRecord = await this.getCount(query);
    const pager = createPager(page, totalRecord, listCnt, pagerCnt);
    // list
    const rs = await this.findAll({
      order: [[field, sort]],
      offset: pager.startIdx,
      limit: listCnt,
      where: {
        [Op.and]: [{ ...sequelize.getWhere(query) }, { binit_id: boardId }],
      },
      include: [{ model: BoardFile, attributes: ['saveName'] }],
    });
    const lists = this.getViewData(rs);
    return { lists, pager, totalRecord: numeral(pager.totalRecord).format(0, 0) };
    /* 
    { --- lists ---
      "id": 1,
      "title": "공지사항 첫번째 입니다.",
      "writer": "최고관리자",
      "content": "모시깽이",
      "updatedAt": "2021-11-04 12:02:57",
      "user_id": 1,
      "binit_id": 1,
      "thumbSrc": "/uploads/211104/211104_397e1c7f-06d0-4ef7-b911-a884dac3f033.jpg"
    }
    */
  };
  return Board;
};
