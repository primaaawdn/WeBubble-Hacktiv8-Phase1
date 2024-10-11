'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(models) {
      Post.hasMany(models.PostTag);
      Post.belongsTo(models.User);
    }

    static async countTotalPosts() {
      try {
        return await this.count();
      } catch (error) {
        throw error;
      }
    }

    get wordCount() {
      return this.content ? this.content.trim().split(/\s+/).length : 0;
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
