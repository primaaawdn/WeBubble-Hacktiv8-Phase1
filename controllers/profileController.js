const { User, Profile, Tag, Post, PostTag } = require("../models");

class ProfileController {
	static async getProfile(req, res) {
		try {
			const { UserId } = req.params;
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
    static async getOrCreate(req, res) {
        try {
            const { UserId } = req.params;
    
            const userProfile = await Profile.findOne({
                where: {id: UserId},
            });
    
            if(userProfile){
                res.redirect(`/users/${UserId}/profile/:profileId`)
            } else {
                res.redirect(`/users/${UserId}/profile/create`)
            }
        } catch (error) {
            res.send(error.message);
        }
    }
    static async createForm(req, res){
        try {
            const {UserId} = req.params.id;
            res.render('CreateProfile', {UserId});
        } catch (error) {
            res.send(error.message);
        }
    }
    static async createProfile(req, res){
        try {
            const {UserId} = req.params.id;
            const {name, gender, bio, group, profilePicture, joinedDate} = req.body;

            await Profile.create({
                UserId: UserId,
                name,
                gender,
                bio,
                group,
                profilePicture,
                joinedDate: new Date()
            })
            
            res.redirect(`/users/${UserId}/profile`)
        } catch (error) {
            
        }
    }
}

module.exports = ProfileController;