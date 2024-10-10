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
			// res.send({dataPost});
			res.render("Post", { dataPost });
		} catch (error) {
            res.send(error.message);
        }
	}

	static async ViewPost(req, res) {
		const {UserId} = req.params
		try {
			const dataPost = await Post.findByPk(UserId, 
				{
				include: [
					{
						model: User,
						attributes: ['username'],
						include: [{
							model: Profile,
							attributes: ['name']
						}]
					}
				]
			});
			// res.send(dataPost);
			res.render('PostId', { dataPost });
		} catch (error) {
            res.send(error.message);
        }
	}

	static async createPost(req, res) {
		let { UserId } = req.params
		try {
			const dataPost = await Post.findByPk(UserId, 
				{
				include: [
					{
						model: User,
						attributes: ['username'],
						include: [{
							model: Profile,
							attributes: ['name', 'profilePicture']
						}]
					}
				]
			});
			// res.send(dataPost);
			res.render('newPost', { dataPost, UserId});
		} catch (error) {
      res.send(error.message);
    }
	}

	static async postNewPost(req, res) {
		const {UserId, content, imageUrl} = req.body
		try {
			
		await Post.create({UserId, content, imageUrl})
		
			res.redirect('/posts');
		} catch (error) {
      res.send(error.message);
    }
	}
}

module.exports = PostController;
