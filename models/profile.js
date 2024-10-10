'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: 'UserId' })
      // define association here
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    bio: DataTypes.STRING,
    group: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    joinedDate: DataTypes.DATE,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Profile",
  }
);
return Profile;
};