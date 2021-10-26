module.exports = (sequelize, DataType) => {
  const Board = sequelize.define('Board', {
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
    title: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataType.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'board',
    timestamps: true,
    paranoid: true,
  });

  Board.associate = (models) => {
    Board.belongsTo(models.User, { 
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      }, 
      sourceKey: 'id', 
      onDelete: 'CASCADE' 
    })
  }

  return Board;
};