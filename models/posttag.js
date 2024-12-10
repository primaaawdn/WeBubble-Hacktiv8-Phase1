'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    /**
     * Define associations between models.
     */
    static associate(models) {
      PostTag.belongsTo(models.Post, { foreignKey: 'PostId', as: 'Post' });

      PostTag.belongsTo(models.Tag, { foreignKey: 'TagsId', as: 'Tag' });
    }
  }

  PostTag.init(
    {
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Posts', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      TagsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tags', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'PostTag',
      tableName: 'PostTags',
      timestamps: true, 
    }
  );

  return PostTag;
};
