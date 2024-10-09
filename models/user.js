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
			username: DataTypes.STRING,
			email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
			password: DataTypes.STRING,
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
