module.exports = (sequelize, force = false) => {
  sequelize
    .sync({ force }) // 실제DBMNS랑 연동시켜줘
    .then(() => console.log('Sequelize Start!'))
    .catch((err) => console.log('Sequelize Error => ', err));
};
