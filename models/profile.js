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
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name must be input"
        },
        notNull: {
          msg: "Name must be input"
        }
      }},
    gender: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Gender must be input"
        },
        notNull: {
          msg: "Gender must be input"
        }
      }
    },
    bio: DataTypes.STRING,
    group: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Groupname must be input"
        },
        notNull: {
          msg: "Groupname must be input"
        }
      }},
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