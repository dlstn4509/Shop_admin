const _ = require('lodash');
const { dateFormat, relPath } = require('../modules/util');

module.exports = (sequelize, DataType) => {
  const CateProduct = sequelize.define(
    'CateProduct',
    {
      prd_id: {
        type: DataType.INTEGER(10).UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      cate_id: {
        type: DataType.INTEGER(10).UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
    },
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
