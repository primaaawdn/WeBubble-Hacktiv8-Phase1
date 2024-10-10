const { Op } = require("sequelize");
const { User, Profile } = require("../models");

class UserController {
	static async getAllUsers(req, res) {
		try {
			let { role, search } = req.query;
			// console.log(req.query);

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
			// res.send(dataUser)
			res.render("Users", { dataUser, role: role || "", search: search || "" });
		} catch (error) {
			res.send(error.message);
		}
	}
	static async createAccountForm(req, res) {
		try {
			res.render("CreateForm");
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
			} // nanti harus benerin validasi lagi

			const existingEmail = await User.findOne({ where: { email } });
			if (existingEmail) {
				return res.status(400).send("Email already exists.");
			} // nanti harus benerin validasi lagi

			const newUser = await User.create({ username, email, password, role });
			res.redirect("/login");
		} catch (error) {
			res.send(error.message);
		}
	}
}

module.exports = UserController;
