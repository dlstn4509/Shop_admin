const _ = require('lodash');
const numeral = require('numeral');
const { dateFormat, relPath } = require('../modules/util');
const createPager = require('../modules/pager-init');
const { escape, unescape } = require('html-escaper');

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
      readCounter: {
        type: DataType.INTEGER(10).UNSIGNED,
        defaultValue: 0,
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
        allowNull: true,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    Product.belongsToMany(models.Cate, {
      // Product (多) : Cate (多)
      foreignKey: {
        name: 'prd_id',
        allowNull: true,
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

  Product.findProduct = async function (id, Cate, ProductFile) {
    const rs = await this.findOne({
      where: { id },
      order: [[ProductFile, 'id', 'ASC']],
      include: [{ model: Cate }, { model: ProductFile }],
    });
    const data = rs.toJSON();
    data.updatedAt = dateFormat(data.updatedAt, 'H');
    data.readCounter = numeral(data.readCounter).format();
    data.content = unescape(data.content);
    data.imgs = [];
    data.details = [];
    if (data.ProductFiles.length) {
      for (let file of data.ProductFiles) {
        let obj = {
          thumbSrc: relPath(file.saveName),
          name: file.oriName,
          id: file.id,
          type: file.fileType,
          fieldNum: file.fieldNum,
        };
        if (obj.type === 'F') data.details.push(obj);
        else data.imgs.push(obj);
      }
    }
    delete data.createdAt;
    delete data.deletedAt;
    delete data.ProductFiles;
    return data;
  };

  Product.getListData = function (rs, type) {
    const data = rs
      .map((v) => v.toJSON())
      .map((v) => {
        v.priceOrigin = numeral(v.priceOrigin).format();
        v.priceSale = numeral(v.priceSale).format();
        if (v.ProductFiles.fieldNum == '1' && v.ProductFiles.fileType == 'I') {
          v.img = relPath(file.saveName);
        } else v.img = 'https://via.placeholder.com/120';
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
          attributes: ['id', 'saveName', 'fileType', 'fieldNum'],
        },
      ],
      order: [
        [field, sort],
        [ProductFile, 'fileType', 'ASC'],
        [ProductFile, 'fieldNum', 'ASC'],
      ],
    });
    const lists = this.getListData(rs);

    return { lists, pager, totalRecord: numeral(pager.totalRecord).format() };
  };

  Product.findProduct;

  return Product;
};
