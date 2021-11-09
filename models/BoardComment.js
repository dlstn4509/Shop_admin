const { dateFormat } = require('../modules/util');

module.exports = (sequelize, DataType) => {
  const BoardComment = sequelize.define(
    'BoardComment',
    {
      id: {
        type: DataType.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      writer: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      comment: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      regDate: {
        type: DataType.VIRTUAL,
        get() {
          return dateFormat(this.getDataValue('createdAt'), 'H');
        },
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      tableName: 'boardcomment',
      paranoid: true,
    }
  );
  BoardComment.associate = (models) => {
    BoardComment.belongsTo(models.Board, {
      // BoardComment (多) : board (1)
      foreignKey: {
        name: 'board_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    BoardComment.belongsTo(models.User, {
      // BoardComment (多) : User (1)
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };
  return BoardComment;
};
