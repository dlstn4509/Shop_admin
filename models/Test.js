module.exports = (sequelize, DataType) => {
  const Test = sequelize.define(
    'Test',
    {
      /* id: {
        type: DataType.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }, */
      /* userid: {
        type: DataType.STRING(24),
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true,
          len: [6, 24],
        },
      }, */
      userpw: {
        type: DataType.CHAR(60),
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      tableName: 'test',
      // timestamps: true,
      // paranoid: true,
    }
  );
  return Test;
};
