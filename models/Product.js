const _ = require('lodash');
const numeral = require('numeral');
const { dateFormat, relPath } = require('../modules/util');
const createPager = require('../modules/pager-init');

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
    Product.hasMany(models.ProductFile, {
      // Product (1) : ProductFile (多)
      foreignKey: {
        name: 'prd_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
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

  Product.getCount = async function (query) {
    return await this.count({
      where: sequelize.getWhere(query),
    });
  };

  Product.getViewData = function (rs, type) {
    const data = rs
      .map((v) => v.toJSON())
      .map((v) => {
        v.priceOrigin = numeral(v.priceOrigin).format();
        v.priceSale = numeral(v.priceSale).format();
        if (type === 'view') {
          v.updatedAt = dateFormat(v.updatedAt, 'H');
          v.readCounter = numeral(v.readCounter).format();
          v.img = [];
          v.detail = [];
          if (v.ProductFiles.length) {
            for (let file of v.ProductFiles) {
              let obj = {
                thumbSrc: relPath(file.saveName),
                name: file.oriName,
                id: file.id,
                type: file.fileType,
              };
              if (obj.type === 'F') v.detail.push(obj);
              else v.img.push(obj);
            }
          }
        } else {
          // list
          if (v.ProductFiles.length) {
            for (let file of v.ProductFiles) {
              if (file.fileType === 'I') {
                v.img = {
                  thumbSrc: relPath(file.saveName),
                };
                break;
              }
            }
          }
          if (!v.img) {
            v.img = {
              thumbSrc: 'https://via.placeholder.com/120',
            };
          }
        }
        delete v.createdAt;
        delete v.deletedAt;
        delete v.ProductFiles;
        return v;
      });
    return data;
  };

  Product.getLists = async function (query, ProductFile) {
    let { field, sort, page, search } = query;
    let listCnt = 10;
    let pagerCnt = 5;
    const totalRecord = await this.getCount(query);
    const pager = createPager(page, totalRecord, listCnt, pagerCnt);

    const rs = await this.findAll({
      offset: pager.startIdx,
      limit: pager.listCnt,
      where: sequelize.getWhere(query),
      include: [
        {
          model: ProductFile,
          attributes: ['id', 'saveName', 'fileType'],
        },
      ],
      order: [
        [field, sort],
        [ProductFile, 'id', 'ASC'],
      ],
    });
    const lists = this.getViewData(rs);

    return { lists, pager, totalRecord: numeral(pager.totalRecord).format() };
  };

  return Product;
};
