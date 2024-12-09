'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    /**
     * Define associations between models.
     */
    static associate(models) {
      // Relationship with Post
      PostTag.belongsTo(models.Post, { foreignKey: 'PostId', as: 'Post' });

      // Relationship with Tag
      PostTag.belongsTo(models.Tag, { foreignKey: 'TagsId', as: 'Tag' });
    }
  }

  // Initialize PostTag model
  PostTag.init(
    {
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Posts', // References the Posts table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      TagsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tags', // References the Tags table
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
      tableName: 'PostTags', // Explicitly set table name
      timestamps: true, // Enables automatic handling of createdAt and updatedAt
    }
  );

  return PostTag;
};
