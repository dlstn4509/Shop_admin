const { dateFormat, relPath } = require('../modules/util');

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

  Board.getCount = async function (query) {
    return await this.count({
      where: { ...sequelize.getWhere(query), binit_id: query.boardId },
      // 펼침으로 가져온 이유는 내 글만 가져올 조건(binit_id: query.boardId)을 추가하기 위해
    });
  };

  Board.searchList = async function (query, pager, BoardFile) {
    let { field = 'id', sort = 'desc', boardId } = query;
    const rs = await this.findAll({
      order: [[field || 'id', sort || 'desc']],
      offset: pager.startIdx,
      limit: pager.listCnt,
      where: { ...sequelize.getWhere(query), binit_id: boardId },
      include: [{ model: BoardFile, attributes: ['saveName'] }],
    });
    const lists = rs
      .map((v) => v.toJSON())
      .map((v) => {
        v.updatedAt = dateFormat(v.updatedAt);
        if (v.BoardFiles.length) v.thumbSrc = relPath(v.BoardFiles[0].saveName);
        delete v.createdAt;
        delete v.deletedAt;
        delete v.BoardFiles;
        return v;
      });
    return lists;
  };

  Board.generateList = function (_lists) {
    const lists = _lists
      .map((v) => v.toJSON())
      .map((v) => {
        v.updatedAt = dateFormat(v.updatedAt, 'H');
        if (v.BoardFiles.length) v.thumbSrc = relPath(v.BoardFiles[0].saveName);
        delete v.createdAt;
        delete v.deletedAt;
        delete v.BoardFiles;
        return v;
      });
    return lists;
  };

  return Board;
};
