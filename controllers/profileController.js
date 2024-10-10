const formattedDate = require("../helpers/formattedDate");
const { User, Profile, Tag, Post, PostTag } = require("../models");

class ProfileController {
	static async getProfile(req, res) {
		try {
			const userId = req.params.UserId;
			const dataProfile = await Profile.findOne({
                where: { UserId: userId },
                include: [
                    {
                        model: User,
                        as: 'User',
                        attributes: ['id', 'username', 'email'], 
                        include: [
                            {
                                model: Post,
                                as: 'Posts', 
                                attributes: ['id', 'content', 'createdAt']
                            }
                        ]
                    }
                ]
            });
            // res.send(dataProfile)
            res.render('UserProfileById', { dataProfile, formattedDate });
		} catch (error) {
			res.send(error.message);
		}
	}
	static async profilePage(req, res) {
		try {
			const UserId = req.session.userId;
			if (!UserId) {
				return res.redirect("/login");
			}

			const user = await User.findOne({
				where: { id: UserId },
			});

			const userProfile = await Profile.findOne({
				where: { UserId },
			});

			let hasProfile = false;

			if (userProfile) {
				hasProfile = true;
			}

			res.render("ProfilePage", { hasProfile, UserId, user });
		} catch (error) {
			res.send(error.message);
		}
	}

	static async createForm(req, res) {
		try {
			const UserId = req.session.userId;
			res.render("CreateProfile", { UserId });
		} catch (error) {
			res.send(error.message);
		}
	}

	static async createProfile(req, res) {
		try {
			const UserId = req.session.userId;

			const { name, gender, bio, group, profilePicture, joinedDate } = req.body;

			const parsedJoinedDate = joinedDate ? new Date(joinedDate) : new Date();

			const newProfile = await Profile.create({
				UserId: UserId,
				name: name,
				gender: gender,
				bio: bio,
				group: group,
				profilePicture: profilePicture,
				joinedDate: parsedJoinedDate,
			});

			console.log("Created Profile ID:", newProfile.id);
			res.redirect(`/users/${UserId}/profile/${newProfile.id}`);
		} catch (error) {
			console.error(error);
			res.send(error.message);
		}
	}
	static async editProfileForm(req, res) {
		try {
			const { UserId, ProfileId } = req.params;
			const userProfile = await Profile.findOne({
				where: { id: ProfileId, UserId: UserId },
			});

			if (!userProfile) {
				return res.status(404).send("Profile not found");
			}
			res.render("EditProfile", { user: userProfile, UserId: UserId });
		} catch (error) {
			res.send(error.message);
		}
	}

	static async editProfile(req, res) {
		try {
			const { userId, profileId } = req.params;
			// const UserId = req.session.userId;
			// const profileId = req.params.ProfileId;

			const { name, gender, bio, group, profilePicture, joinedDate } = req.body;

			const parsedJoinedDate = joinedDate ? new Date(joinedDate) : new Date();

			await Profile.update(
				{
					name: name,
					gender: gender,
					bio: bio,
					group: group,
					profilePicture: profilePicture,
					joinedDate: parsedJoinedDate,
				},
				{
					where: { id: profileId, UserId: userId },
				}
			);

			res.redirect(`/users/${userId}/profile/${profileId}`);
		} catch (error) {
			res.send(error.message);
		}
	}
}

module.exports = ProfileController;
