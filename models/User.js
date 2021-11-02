const bcrypt = require('bcrypt');
const { generateUser } = require('../modules/util');
module.exports = (sequelize, { DataTypes: DataType, Op }) => {
  const User = sequelize.define(
    'User',
    {
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
        validate: {
          isAlphanumeric: true,
          len: [6, 24],
        },
      },
      userpw: {
        type: DataType.CHAR(60),
        allowNull: false,
        /* set(value) {
          const { BCRYPT_SALT: salt, BCRYPT_ROUND: rnd } = process.env;
          const hash = bcrypt.hashSync(value + salt, Number(rnd));
          this.setDataValue('userpw', hash);
        }, */
      },
      username: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataType.STRING(255),
        allowNull: false,
        validated: {
          isEmail: true,
        },
      },
      status: {
        type: DataType.ENUM,
        /* 
        0: 탈퇴, 1: 유휴, 2: 일반, 3: 우대, 7:관리자, 8: 관리자, 9: 최고관리자
        */
        values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        allowNull: false,
        defaultValue: '2',
      },
      addrPost: {
        type: DataType.CHAR(5),
      },
      addrRoad: {
        type: DataType.STRING(255),
      },
      addrJibun: {
        type: DataType.STRING(255),
      },
      addrComment: {
        type: DataType.STRING(255),
      },
      addrDetail: {
        type: DataType.STRING(255),
      },
      tel: {
        type: DataType.STRING(14),
        validated: {
          len: [11, 14],
        },
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      tableName: 'user',
      paranoid: true,
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Board);
  };

  User.beforeCreate(async (user) => {
    const { BCRYPT_SALT: salt, BCRYPT_ROUND: rnd } = process.env;
    const hash = await bcrypt.hash(user.passwd + salt, Number(rnd));
    user.userpw = hash;
  });

  User.searchUser = async function (query, pager) {
    let { field = 'id', search = '', sort = 'desc' } = query;
    let where = search ? { [field]: { [Op.like]: '%' + search + '%' } } : null;
    if (field === 'addrRoad' && search !== '') {
      where = {
        [Op.or]: {
          addrPost: { [Op.like]: '%' + search + '%' },
          addrRoad: { [Op.like]: '%' + search + '%' },
          addrJibun: { [Op.like]: '%' + search + '%' },
          addrComment: { [Op.like]: '%' + search + '%' },
          addrDetail: { [Op.like]: '%' + search + '%' },
        },
      };
    }
    const rs = await this.findAll({
      order: [[field || 'id', sort || 'desc']],
      offset: pager.startIdx,
      limit: pager.listCnt,
      where,
    });
    const users = generateUser(rs);
    return users;
  };

  return User;
};
