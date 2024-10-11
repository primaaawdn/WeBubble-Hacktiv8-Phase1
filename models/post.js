'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasMany(models.PostTag);
      Post.belongsTo(models.User);
    }
  }
  
  Post.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "UserId must be input!"
        },
        notNull: {
          msg: "UserId must be input!"
        }
      }
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "Tell us your stories!"
        },
        notNull: {
          msg: "Tell us your stories!"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING 
    }
  }, {
    sequelize,
    modelName: 'Post',
  });

  return Post;
};
