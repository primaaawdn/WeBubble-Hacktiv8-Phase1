const { Post, User, Profile } = require("../models");
const formattedDate = require("../helpers/formattedDate");
const fs = require("fs");
const path = require("path");

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
      const totalPosts = await Post.countTotalPosts();
      res.render("Post", { dataPost, userId, formattedDate, totalPosts });
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

      // console.log(dataPost);
      res.render("PostId", { dataPost, formattedDate });
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
      res.render("newPost", { userData });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async postNewPost(req, res) {
    const { content } = req.body;
    const userId = req.session.userId;
    const imageUrl = req.file ? `uploads/${req.file.filename}` : null;
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
        res.status(500).send("there's an error in our end");
      }
    }
  }

  static async YourPost(req, res) {
    try {
      const userId = req.session.userId;
      const dataPost = await Post.findAll({
        where: { UserId: userId },
        order: [["createdAt", "DESC"]],
      });
      res.render("YourPost", { userId, dataPost, formattedDate });
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
      res.render("EditPost", { userData });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async postEdit(req, res) {
    const { content } = req.body;
    const newImage = req.file ? `uploads/${req.file.filename}` : null; 
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
        const oldImagePath = path.join(__dirname, "../", post.imageUrl); // Path lengkap ke gambar lama
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
