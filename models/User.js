module.exports = (sequelize, DataType) => {
  // define(객체명, 객체속성, 객체옵션)
  const User = sequelize.define('User', {
    id: {
      type: DataType.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userid: {
      type: DataType.STRING(24),
      allowNull: false,
      unique: true,
    },
    userpw: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    username: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataType.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'user',
    timestamps: true,  // createdAt, updatedAt
    paranoid: true,    // deletedAt - 실제 delete를 시키지 않고 삭제일만 등록
  });

  User.associate = (models) => {
    User.hasMany(models.Board, { 
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      }, 
      sourceKey: 'id', 
      onDelete: 'CASCADE' 
    })
  }

  return User;
};