const { validationResult } = require("express-validator");
const formattedDate = require("../helpers/formattedDate");

const { Post, User, Profile, Tag, PostTag, sequelize } = require("../models");
const { includes } = require("../validations/login.validation");

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
						// 	{
						// 		model: PostTag,
						// 		include: [{
						// 				model: Tag,
						// 				attributes: ['tag']
						// 		}]
						// }
						],
					},
				],
				

				order: [["createdAt", "DESC"]],
			});
			res.render("Post", { dataPost, userId, formattedDate });
		} catch (error) {
			res.send(error);
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
			res.render("PostId", { dataPost, formattedDate });
		} catch (error) {
			res.send(error.message);
		}
	}

	static async createPost(req, res) {
		try {
			const userId = req.session.userId; 
			const userData = await User.findOne({
				where: { id: userId }
			});

			if (!userData) {
				return res.status(404).send('User not found'); 
			}
			res.send({ userData }); 
			// res.render('newPost', { userData }); 
		} catch (error) {
			res.status(500).send(error.message); 
		}
	}

	static async postNewPost(req, res) {
		const {content, imageUrl} = req.body
		const userId = req.session.userId
		try {
			await Post.create({UserId: userId, content, imageUrl})
			res.redirect('/posts');
		} catch (error) {
			res.send(error.message);
		}
	}

	static async YourPost(req, res) {
		try {
			const userId = req.session.userId; 
			// console.log(req.session.userId);
            const dataPost = await Post.findAll({
                where: { UserId: userId }, 
                order: [['createdAt', 'DESC']],
            });
			
			// res.send(dataPost)
            res.render('YourPost', { userId, dataPost, formattedDate }); 
        } catch (error) {
            res.status(500).send(error.message); 
        }
    }

	static async getEdit(req, res) {
    
		const PostId = req.params.PostId
    try {
        const userData = await Post.findByPk(PostId);
        // res.send({ userData }); 
        res.render('EditPost', { userData }); 
    } catch (error) {
        res.status(500).send(error.message); 
    }
	}

	static async postEdit(req, res) {

    const { content, imageUrl } = req.body;
    const userId = req.session.userId;
    const PostId = req.params.PostId; 

    try {
        await Post.update({ content, imageUrl },
          {
            where: { id: PostId, UserId: userId }, 
          }
        );

      	res.redirect(`/posts/YourPost/${userId}`); 
        
    } catch (error) {
        res.status(500).send(error.message); 
    }
}
		static async removePost(req, res) {
		const userId = req.session.userId;
		const PostId = req.params.PostId
		try {
			await Post.destroy({
				where: { id: PostId }
		});
			// res.send({ userData }); 
			res.redirect(`/posts/YourPost/${userId}`)
		} catch (error) {
			res.status(500).send(error.message); 
		}
}

}

module.exports = PostController;
