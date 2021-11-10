const _ = require('lodash');
const { dateFormat, relPath } = require('../modules/util');

module.exports = (sequelize, { DataTypes, Op }) => {
  const CateProduct = sequelize.define(
    'CateProduct',
    {},
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      tableName: 'cate_product',
      paranoid: true,
    }
  );

  CateProduct.associate = (models) => {
    CateProduct.belongsTo(models.Cate, {
      // CateProduct (多) : Cate (1)
      foreignKey: {
        name: 'cate_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    CateProduct.belongsTo(models.Product, {
      // CateProduct (多) : Product (1)
      foreignKey: {
        name: 'prd_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return CateProduct;
};
