const bcrypt = require('bcrypt');
const { getSeparateString } = require('../modules/util');
const numeral = require('numeral');
const createPager = require('../modules/pager-init');
// pager-init 을 createPager 라는 이름으로 가져다 씀

// ------------------------- 내가 만든거 ------------------------
// if (field === 'tel' && search !== '') {
//   search = search.replace(/^\s*/, '%');
//   search = search.replace(/\s*$/, '%');
//   let result = '';
//   for (let i = 0; i < search.length - 1; i++) {
//     let v = search.substr(i, 1);
//     if (v !== '%') {
//       result += v + '%';
//     } else {
//       result += v;
//     }
//   }
//   where = {
//     tel: { [Op.like]: `${result}` },
//   };
// }
// ---------------------------------------------------------

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
        unique: true,
        validate: {
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
      },
      tel1: {
        type: DataType.VIRTUAL,
      },
      tel2: {
        type: DataType.VIRTUAL,
      },
      tel3: {
        type: DataType.VIRTUAL,
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
    // user (1) : board (多)
    User.hasMany(models.Board, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.BoardCounter, {
      // user (1) : BoardCounter (多)
      foreignKey: {
        name: 'user_id',
        allowNull: true,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  // ------ db 저장전 passwd, tel 정리 --------
  User.beforeCreate(async (user) => {
    // user = req.body의 모든것
    const { BCRYPT_SALT: salt, BCRYPT_ROUND: rnd } = process.env;
    const hash = await bcrypt.hash(user.passwd + salt, Number(rnd));
    user.userpw = hash;
    user.tel = getSeparateString([user.tel1, user.tel2, user.tel3], '-');
    // user.tel1 + '-' + user.tel2 + '-' + user.tel3
  });

  // ------ db 수정전 tel 정리 --------
  User.beforeUpdate(async (user) => {
    user.tel = getSeparateString([user.tel1, user.tel2, user.tel3], '-');
    // user.tel1 + '-' + user.tel2 + '-' + user.tel3
  });

  // ------- totalRecord 구하기 --------
  User.getCount = async function (query) {
    return await this.count({
      where: sequelize.getWhere(query),
    });
  };

  // ------- 리스트, pager 가져오기 findAll --------
  User.getLists = async function (query) {
    // query = req.query, pager = req.pager
    let { field = 'id', search = '', sort = 'desc', page = 1 } = query;
    // pager
    const totalRecord = await this.getCount(query);
    const pager = createPager(page, totalRecord, (_listCnt = 5), (_pagerCnt = 5));
    // list
    const rs = await this.findAll({
      order: [[field * 1 || 'id', sort || 'desc']],
      offset: pager.startIdx,
      limit: pager.listCnt,
      where: sequelize.getWhere(query),
    });
    const lists = rs
      .map((v) => v.toJSON())
      .map((v) => {
        v.addr1 =
          v.addrPost && v.addrRoad
            ? `[${v.addrPost}]
              ${v.addrRoad || ''}
              ${v.addrComment || ''}
              ${v.addrDetail || ''}`
            : '';
        v.addr2 =
          v.addrPost && v.addrJibun
            ? `[${v.addrPost}] 
              ${v.addrJibun}
              ${v.addrDetail || ''}`
            : '';
        v.level = '';
        switch (v.status) {
          case '0':
            v.level = '탈퇴회원';
            break;
          case '1':
            v.level = '유휴회원';
            break;
          case '2':
            v.level = '일반회원';
            break;
          case '8':
            v.level = '관리자';
            break;
          case '9':
            v.level = '최고관리자';
            break;
          default:
            v.level = '회원';
            break;
        }
        return v;
      });
    return { lists, pager, totalRecord: numeral(pager.totalRecord).format(0, 0) };
  };

  return User;
};
