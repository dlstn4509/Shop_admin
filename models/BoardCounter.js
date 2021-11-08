module.exports = (sequelize, DataType) => {
  const BoardCounter = sequelize.define(
    'BoardCounter',
    {
      id: {
        type: DataType.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ip: {
        type: DataType.STRING(50),
        allowNull: true,
      },
      referrer: {
        // 이전페이지, 마케팅용, 어디를 타고 들어왔는지 확인용
        type: DataType.STRING(255),
        allowNull: true,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      tableName: 'boardcounter',
    }
  );
  BoardCounter.associate = (models) => {
    // boardcounter (多) : board (1)
    BoardCounter.belongsTo(models.Board, {
      foreignKey: {
        name: 'board_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // boardcounter (多) : user (1)
    BoardCounter.belongsTo(models.User, {
      foreignKey: {
        name: 'board_id',
        allowNull: true,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };
  return BoardCounter;
};
