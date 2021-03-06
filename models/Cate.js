const _ = require('lodash');
const { dateFormat, relPath } = require('../modules/util');

module.exports = (sequelize, DataType) => {
  const Cate = sequelize.define(
    'Cate',
    {
      id: {
        type: DataType.STRING(50),
        primaryKey: true,
        allowNull: true,
        unique: true,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      tableName: 'cate',
      paranoid: true,
    }
  );

  Cate.associate = (models) => {
    Cate.belongsToMany(models.Product, {
      // Cate (多) : Product (多)
      foreignKey: {
        name: 'cate_id',
        allowNull: true,
      },
      through: 'cate_product',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return Cate;
};
