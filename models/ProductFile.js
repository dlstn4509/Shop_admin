module.exports = (sequelize, DataType) => {
  const ProductFile = sequelize.define(
    'ProductFile',
    {
      id: {
        type: DataType.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      oriName: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      saveName: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      mimeType: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      fileType: {
        type: DataType.ENUM,
        allowNull: false,
        values: ['I', 'F'],
        defaultValue: 'I',
      },
      fieldNum: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      size: {
        type: DataType.INTEGER,
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      tableName: 'productfile',
      paranoid: true,
    }
  );

  ProductFile.associate = (models) => {
    ProductFile.belongsTo(models.Product, {
      // ProductFile (多) : Product (多)
      foreignKey: {
        name: 'prd_id',
        allowNull: true,
      },
      sourceKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return ProductFile;
};
