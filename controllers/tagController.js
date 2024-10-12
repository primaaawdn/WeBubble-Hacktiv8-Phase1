const { User, Profile, Tag, Post, PostTag } = require("../models");

class TagController {
  static async getTag(req, res) {
    try {
      const dataTag = await Tag.findAll();
      res.send({ dataTag });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  }

  static async addNewTag(req, res) {
    const { tag } = req.body; 
    const PostId = req.params.PostId; 
    const UserId = req.session.userId;

    try {
      const newTag = await Tag.create({ tag });
      const newPostTag = await PostTag.create({
        PostId: PostId,
        TagsId: newTag.id 
      });
      
      res.redirect(`/posts/${PostId}/tag`, {newPostTag}); 

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = TagController;
