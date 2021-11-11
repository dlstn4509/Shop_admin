const _ = require('lodash');
const { dateFormat, relPath } = require('../modules/util');

module.exports = (sequelize, DataType) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataType.INTEGER(10).UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      priceOrigin: {
        type: DataType.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
      },
      priceSale: {
        type: DataType.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
      },
      amount: {
        type: DataType.INTEGER(10),
        allowNull: false,
        defaultValue: '-1',
      },
      status: {
        type: DataType.ENUM,
        values: ['0', '1', '2'],
        defaultValue: '2',
        allowNull: false,
      },
      summary: {
        type: DataType.TEXT,
      },
      content: {
        type: DataType.TEXT,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      tableName: 'product',
      paranoid: true,
    }
  );

  Product.associate = (models) => {
    Product.belongsToMany(models.Cate, {
      // Product (多) : Cate (多)
      foreignKey: {
        name: 'prd_id',
        allowNull: false,
      },
      through: 'cate_product',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return Product;
};
