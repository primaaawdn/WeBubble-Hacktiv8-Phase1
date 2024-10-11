const { Op } = require("sequelize");
const { User, Profile } = require("../models");

class UserController {
	static async getAllUsers(req, res) {
		try {
			let { role, search } = req.query;

			let filterRole = {};
			let searchName = {};

			if (role) {
				filterRole.role = role;
			}

			if (search) {
				searchName = {
					"name": { [Op.iLike]: `%${search}%` },
				};
			}

			const dataUser = await Profile.findAll({
				include: [
					{
						model: User,
						attributes: ["email", "role"],
						where: {
							...filterRole,
						},
					},
				],
				where: { ...searchName },
				order: [["name", "ASC"]],
			});

			res.render("Users", { dataUser, role: role || "", search: search || "" });
		} catch (error) {
			res.send(error.message);
		}
	}
	static async createAccountForm(req, res) {
		try {
			const UserId = req.params.id;
            res.render('CreateForm', { UserId });
		} catch (error) {
			res.send(error.message);
		}
	}
	static async createAccount(req, res) {
		try {
			const { username, email, password, role } = req.body;

			const existingUser = await User.findOne({ where: { username } });
			if (existingUser) {
				return res.status(400).send("Username already exists.");
			} 

			const existingEmail = await User.findOne({ where: { email } });
			if (existingEmail) {
				return res.status(400).send("Email already exists.");
			} 

			const newUser = await User.create({ username, email, password, role });
			res.redirect("/login");
		} catch (error) {
			if(error.name === "SequelizeValidationError"){
        let errors = error.errors.map(e => e.message)
        res.send(errors)
      }
		}
	}
}

module.exports = UserController;
