const formattedDate = require("../helpers/formattedDate");
const { User, Profile, Post } = require("../models");

class ProfileController {
	static async getProfile(req, res) {
		try {
			const { UserId } = req.params;

			const dataProfile = await Profile.findOne({
				where: { UserId },
				include: [
					{
						model: User,
						as: "User",
						attributes: ["id", "username", "email"],
						include: [
							{
								model: Post,
								as: "Posts",
								attributes: ["id", "content", "createdAt"],
							},
						],
					},
				],
			});

			if (!dataProfile) {
				return res.redirect(`/users/${UserId}/profile/create`);
			}

			const loggedInUser = req.session.userId;

			res.render("UserProfileById", { dataProfile, formattedDate, loggedInUser });
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	static async profilePage(req, res) {
		try {
			const UserId = req.session.userId;
			if (!UserId) {
				return res.redirect("/login");
			}

			const user = await User.findByPk(UserId);
			const userProfile = await Profile.findOne({ where: { UserId } });

			const hasProfile = !!userProfile;

			res.render("ProfilePage", { hasProfile, UserId, user });
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	static async createForm(req, res) {
		try {
			const UserId = req.session.userId;
			res.render("CreateProfile", { UserId });
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	static async createProfile(req, res) {
		try {
			const UserId = req.session.userId;
			const { name, gender, bio, group } = req.body;
			const profilePicture = req.file ? `uploads/${req.file.filename}` : null;
			const joinedDate = req.body.joinedDate
				? new Date(req.body.joinedDate)
				: new Date();

			const newProfile = await Profile.create({
				UserId,
				name,
				gender,
				bio,
				group,
				profilePicture,
				joinedDate,
			});

			res.redirect(`/users/${UserId}/profile`);
		} catch (error) {
			if (error.name === "SequelizeValidationError") {
				const errors = error.errors.map((e) => e.message);
				res.status(400).send(errors);
			} else {
				res.status(500).send(error.message);
			}
		}
	}

	static async editProfileForm(req, res) {
		try {
			const { UserId } = req.params;

			const userProfile = await Profile.findOne({
				where: { UserId },
			});

			if (!userProfile) {
				return res.status(404).send("Profile not found");
			}

			res.render("EditProfile", { user: userProfile, UserId });
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	static async editProfile(req, res) {
		try {
			const { UserId } = req.params;
			const { name, gender, bio, group, profilePicture, joinedDate } = req.body;

			const updatedFields = {
				name,
				gender,
				bio,
				group,
				profilePicture,
				joinedDate: joinedDate ? new Date(joinedDate) : new Date(),
			};

			const [updatedRows] = await Profile.update(updatedFields, {
				where: { UserId },
			});

			if (!updatedRows) {
				return res.status(404).send("Profile not found or no changes made");
			}

			res.redirect(`/users/${UserId}/profile`);
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
}

module.exports = ProfileController;
