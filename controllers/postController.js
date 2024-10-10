const { validationResult } = require("express-validator");
const { Post, User, Profile, sequelize } = require("../models");

class PostController {
	static async getPost(req, res) {
		try {
			const userId = req.session.userId;
			const dataPost = await Post.findAll({
				include: [
					{
						model: User,
						attributes: ["username"],
						include: [
							{
								model: Profile,
								attributes: ["name"],
							},
						],
					},
				],
				order: [["createdAt", "DESC"]],
			});
			res.render("Post", { dataPost, userId, csrfToken: req.csrfToken() });
		} catch (error) {
			res.send(error.message);
		}
	}
	static async ViewPost(req, res) {
		const { PostId } = req.params;
		try {
			const dataPost = await Post.findByPk(PostId, {
				include: [
					{
						model: User,
						attributes: ["username"],
						include: [
							{
								model: Profile,
								attributes: ["name"],
							},
						],
					},
				],
			});
			// res.send(dataPost);
			res.render("PostId", { dataPost });
		} catch (error) {
			res.send(error.message);
		}
	}

	static async createPost(req, res) {
    const userId = req.session.userId; 
    try {
        if (!userId) {
            return res.status(401).send('User not logged in'); // Jika user tidak login
        }
        const userData = await User.findOne({
            where: { id: userId }
        });

        if (!userData) {
            return res.status(404).send('User not found'); 
        }
        // res.send({ userData }); 
        res.render('newPost', { userData }); // Menggunakan data untuk merender halaman
    } catch (error) {
        res.status(500).send(error.message); // Menangani error dengan status 500
    }
}


	static async postNewPost(req, res) {
		const {content, imageUrl} = req.body
		const userId = req.session.userId
		try {
			if (!userId) {
				return res.status(401).send('User not logged in'); // Jika user tidak login
			}
			await Post.create({UserId: userId, content, imageUrl})
			res.redirect('/posts');
		} catch (error) {
			res.send(error.message);
		}
	}
}

module.exports = PostController;
