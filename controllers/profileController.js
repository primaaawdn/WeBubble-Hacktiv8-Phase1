const { User, Profile, Tag, Post, PostTag } = require("../models");

class ProfileController {
	static async getProfile(req, res) {
		try {
			const { UserId, ProfileId } = req.params;
			const dataProfile = await User.findOne({
				where: {id: UserId},
				include: [
					{
						model: Profile,
						attributes: [
                            "id",
							"name",
							"gender",
							"bio",
							"group",
							"profilePicture",
							"joinedDate",
						],
					},
					{
						model: Post,
						attributes: ["content", "createdAt", "imageUrl"],
					},
				],
			});
            // res.send(dataProfile)
			res.render("UserProfileById", { dataProfile });
		} catch (error) {
            res.send(error.message);
        }
	}
}

module.exports = ProfileController;