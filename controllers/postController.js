const { where } = require("sequelize");
const { Post, User, Profile } = require("../models");

class PostController {
	static async getPost(req, res) {
		try {
			const userId = req.session.userId;
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
<<<<<<< HEAD
			// res.send({dataPost});
		
			res.render("Post", { dataPost, userId: userId || null });
=======
			res.render("Post", { dataPost, csrfToken: req.csrfToken() });
>>>>>>> a539526e312dbf091bf89709e42846348abc5fad
		} catch (error) {
			res.send(error.message);
		}
	}
<<<<<<< HEAD

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
		const {userId} = req.session.userId
		try {
			const [data] = await User.findAll({
				where: { id: userId }
		});
			res.send(data)
			// res.render('newPost', {data});
		} catch (error) {
      res.send(error.message);
    }
	}

	static async postNewPost(req, res) {
		const {UserId, content, imageUrl} = req.body
		const {userId} = req.session.userId
		try {
			
			await Post.create({UserId, content, imageUrl})
			res.send()
			// res.redirect('/posts');
		} catch (error) {
      res.send(error.message);
    }
	}
=======
	
>>>>>>> a539526e312dbf091bf89709e42846348abc5fad
}

module.exports = PostController;
