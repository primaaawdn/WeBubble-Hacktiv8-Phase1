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
      Post.hasMany(models.PostTag)
      Post.belongsTo(models.User)
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
    UserId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};