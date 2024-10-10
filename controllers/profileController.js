const { User, Profile, Tag, Post, PostTag } = require("../models");

class ProfileController {
    static async getProfile(req, res) {
        try {
            const { UserId } = req.params;
            const dataProfile = await User.findOne({
                where: { id: UserId },
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
            res.render("UserProfileById", { dataProfile });
        } catch (error) {
            res.send(error.message);
        }
    }
    static async profilePage(req, res) {
        try {
            const UserId = req.session.userId;
            if (!UserId) {
                return res.redirect('/login');
            }

            const user = await User.findOne({
                where: { id: UserId },
            });

            const userProfile = await Profile.findOne({
                where: { UserId }
            });

            let hasProfile = false;

            if (userProfile) {
                hasProfile = true;
            }

            res.render('ProfilePage', { hasProfile, UserId, user });
        } catch (error) {
            res.send(error.message);
        }
    }
    static async createForm(req, res) {
        try {
            const UserId = req.session.userId;
            res.render('CreateProfile', { UserId });
        } catch (error) {
            res.send(error.message);
        }
    }
    static async createProfile(req, res) {
        try {
            const UserId = req.session.userId;
            const id = req.params
    
            const { name, gender, bio, group, profilePicture, joinedDate } = req.body;
    
            // if (!name) {
            //     return res.status(400).send("Name is required."); // Send a 400 error response if name is missing
            // }
    
            const parsedJoinedDate = joinedDate ? new Date(joinedDate) : new Date();
    
            await Profile.create({
                UserId: UserId,
                name: name,
                gender: gender,
                bio: bio,
                group: group,
                profilePicture: profilePicture,
                joinedDate: parsedJoinedDate
            });

            console.log("Created Profile ID:", Profile.id);
            res.redirect(`/users/${UserId}/profile/${Profile.id}`);
        } catch (error) {
            // console.error(error);
            res.send(error.message);
        }
    }
    static async editProfileForm(req, res){
        try {
            const UserId = req.session.userId;
            const profileId = req.params.ProfileId; 
            const userProfile = await Profile.findOne({
                where: { id: profileId}
            })

            res.render('EditProfile', { UserId, user: userProfile });
        } catch (error) {
            res.send(error.message);
        }
    }
    static async editProfile(req, res) {
        try {
            const UserId = req.session.userId;
            const id = req.params
    
            const { name, gender, bio, group, profilePicture, joinedDate } = req.body;
    
            // if (!name) {
            //     return res.status(400).send("Name is required."); // Send a 400 error response if name is missing
            // }
    
            const parsedJoinedDate = joinedDate ? new Date(joinedDate) : new Date();
    
            await Profile.create({
                UserId: UserId,
                name: name,
                gender: gender,
                bio: bio,
                group: group,
                profilePicture: profilePicture,
                joinedDate: parsedJoinedDate
            });

            res.redirect(`/users/${UserId}/profile/${Profile.id}`);
        } catch (error) {
            res.send(error.message);
        }
    }
}

module.exports = ProfileController;
