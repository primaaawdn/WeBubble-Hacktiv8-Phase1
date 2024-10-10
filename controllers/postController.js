const { Post, User, Profile } = require("../models");

class PostController {
	static async getPost(req, res) {
		try {
			const dataPost = await Post.findAll({
				include: [
					{
						model: User,
						attributes: ['username'],
						include: [{
							model: Profile,
							attributes: ['name']
						}]
					}
				],
				order: [['createdAt', 'DESC']],
			});
			res.render("Post", { dataPost, csrfToken: req.csrfToken() });
		} catch (error) {
			res.send(error.message);
		}
	}
	
}

module.exports = PostController;
