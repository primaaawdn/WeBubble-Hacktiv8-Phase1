const { Post, User, Profile, PostTag, Tag } = require("../models");
const formattedDate = require("../helpers/formattedDate");
const fs = require("fs");
const path = require("path");
const formattedTime = require("../helpers/formattedTime");
const formattedText = require("../helpers/formattedText");
const posttag = require("../models/posttag");

class PostController {
  static async getPost(req, res) {
    try {
      const userId = req.session.userId;

      console.log("isProfileComplete:", req.session.isProfileComplete);


      const isProfileComplete = req.session.isProfileComplete;
      if (!isProfileComplete) {
        return res.redirect("/users/:UserId/profile/create"); 
       }

      const dataPost = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["username"],
            include: [
              {
                model: Profile,
                attributes: ["name", "profilePicture"],
              },
            ],
          },
          {
            model: PostTag,
            attributes: ["TagsId"],
            include: [
              {
                model: Tag,
                as: "Tag",
                attributes: ["tag"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      const totalPosts = await Post.countTotalPosts();
      res.render("Post", { dataPost, userId, formattedDate, totalPosts, isProfileComplete });
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
                attributes: ["name", "profilePicture"],
              },
            ],
          },
					{
						model: PostTag,
						attributes: ["TagsId"],
						include: [
							{
								model: Tag,
								as: "Tag",
								attributes: ["tag"],
							},
						],
					},
        ],
      });

      // console.log(dataPost);
      res.render("PostId", { dataPost, formattedDate, formattedTime });
    } catch (error) {
      res.send(error.message);
    }
  }
  static async createPost(req, res) {
    try {
      const userId = req.session.userId;
      const userData = await User.findOne({
        where: { id: userId },
      });

      if (!userData) {
        return res.status(404).send("User not found");
      }
      res.render("newPost", { userData, formattedText });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async postNewPost(req, res) {
    const { content } = req.body;
    const userId = req.session.userId;
    const imageUrl = req.file ? req.file.path : null;

    if (content.length > 280) {
      return res
        .status(400)
        .send("Content must be less than or equal to 280 characters.");
    }

    try {
      await Post.create({
        UserId: userId,
        content,
        imageUrl,
      });
      res.redirect("/posts");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((e) => e.message);
        res.status(400).send(errors);
      } else {
        res.status(500).send("There's an error on our end.");
      }
    }
  }

  static async YourPost(req, res) {
    try {
      const userId = req.session.userId;
      const dataPost = await Post.findAll({
        where: { UserId: userId },
        include: [
          {
            model: PostTag,
            attributes: ["TagsId"],
            include: [
              {
                model: Tag,
                as: "Tag",
                attributes: ["tag"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      // console.log(dataPost);

      res.render("YourPost", {
        userId,
        dataPost,
        formattedDate,
        formattedTime,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getEdit(req, res) {
    const PostId = req.params.PostId;
    try {
      const userData = await Post.findByPk(PostId, {
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
      // console.log(userData.User.dataValues.username);
      res.render("EditPost", {
        userData,
        formattedDate,
        formattedTime,
        formattedText,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async postEdit(req, res) {
    const { content } = req.body;
    const newImage = req.file ? req.file.path : null;
    const userId = req.session.userId;
    const PostId = req.params.PostId;

    try {
      const post = await Post.findOne({
        where: { id: PostId },
      });

      if (!post) {
        return res.status(404).send("Post not found");
      }

      if (newImage && post.imageUrl) {
        const oldImagePath = path.join(__dirname, "../", post.imageUrl);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old file:", err.message);
          }
        });
      }

      await Post.update(
        {
          content,
          imageUrl: newImage || post.imageUrl,
        },
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
    const PostId = req.params.PostId;

    try {
      const post = await Post.findOne({
        where: { id: PostId },
      });

      if (!post) {
        return res.status(404).send("Post not found");
      }

      if (post.imageUrl) {
        const filePath = path.join(__dirname, "../", post.imageUrl);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err.message);
          }
        });
      }

      await Post.destroy({
        where: { id: PostId },
      });

      res.redirect(`/posts/YourPost/${userId}`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = PostController;
