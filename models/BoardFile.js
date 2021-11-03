module.exports = (sequelize, DataType) => {
  const BoardFile = sequelize.define(
    'BoardFile',
    {
      id: {
        type: DataType.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      oriName: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      saveName: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      mimeType: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      fileType: {
        type: DataType.ENUM,
        allowNull: false,
        values: ['I', 'F'],
        defaultValue: 'F',
      },
      size: {
        type: DataType.INTEGER(10),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      tableName: 'boardfile',
      paranoid: true,
    }
  );
  BoardFile.associate = (models) => {
    // boardfile (多) : board (1)
    BoardFile.belongsTo(models.Board, {
      foreignKey: {
        name: 'board_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };
  return BoardFile;
};
