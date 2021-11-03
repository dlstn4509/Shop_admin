module.exports = (sequelize, DataType) => {
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
      foreignKey: {
        name: 'binit_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Board.hasMany(models.BoardFile, {
      foreignKey: {
        name: 'board_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Board.hasMany(models.BoardComment, {
      foreignKey: {
        name: 'board_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };
  return Board;
};
