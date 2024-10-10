const { Post, User, Profile } = require("../models");

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
		const { userId } = req.session.userId;
		try {
			const [data] = await User.findAll({
				where: { id: userId },
			});
			res.send(data);
			// res.render('newPost', {data});
		} catch (error) {
			res.send(error.message);
		}
	}

	static async postNewPost(req, res) {
		const { UserId, content, imageUrl } = req.body;
		const { userId } = req.session.userId;
		try {
			await Post.create({ UserId, content, imageUrl });
			res.send();
			// res.redirect('/posts');
		} catch (error) {
			res.send(error.message);
		}
	}
}

module.exports = PostController;
