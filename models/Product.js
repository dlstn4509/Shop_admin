const _ = require('lodash');
const { dateFormat, relPath } = require('../modules/util');

module.exports = (sequelize, { DataTypes, Op }) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
