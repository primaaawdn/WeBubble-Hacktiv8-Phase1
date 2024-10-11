"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasOne(models.Profile);
			User.hasMany(models.Post);
		}
	}
	User.init(
		{
			username: {
				allowNull: false,
      	type: DataTypes.STRING,
      	validate: {
        notEmpty: {
          args: true,
          msg: "Username must be input"
        },
        notNull: {
          msg: "Username must be input"
        }
      }
			},
			email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
					notEmpty: {
						args: true,
						msg: "Username must be input"
					},
					notNull: {
						msg: "Username must be input"
					},
          isEmail: true,
        }
      },
			password: {
				allowNull: false,
				type: DataTypes.STRING,
				notEmpty: {
          args: true,
          msg: "Password must be input"
        },
        notNull: {
          msg: "Password must be input"
        }
			},
			role: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
			hooks: {
				beforeCreate: async (user) => {
					const salt = await bcrypt.genSalt(10);
					user.password = await bcrypt.hash(user.password, salt);
				},
			},
		}
	);
	return User;
};
