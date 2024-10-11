'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definisikan hubungan dengan model Post dan Tag
      PostTag.belongsTo(models.Post, { foreignKey: 'PostId' });
      PostTag.belongsTo(models.Tag, { foreignKey: 'TagsId' });
    }
  }

  // Inisialisasi model PostTag dengan kolom yang dibutuhkan
  PostTag.init({
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts', // Nama tabel yang direferensikan
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    TagsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tags', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'PostTag',
    tableName: 'PostTags', 
    timestamps: true 
  });

  return PostTag;
};
