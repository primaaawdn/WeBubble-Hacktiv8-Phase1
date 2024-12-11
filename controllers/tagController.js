const { User, Profile, Tag, Post, PostTag } = require("../models");

class TagController {
  // static async getTag(req, res) {
  //   try {
  //     const dataTag = await Tag.findAll();
  //     res.send({ dataTag });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({ message: error.message });
  //   }
  // }

  
  

  // static async addNewTag(req, res) {
  //   const { tag } = req.body; 
  //   const PostId = req.params.PostId; 
  //   const UserId = req.session.userId;

  //   try {
  //     const newTag = await Tag.create({ tag });
  //     const newPostTag = await PostTag.create({
  //       PostId: PostId,
  //       TagsId: newTag.id 
  //     });
      
  //     res.redirect(`/posts/YourPost/${UserId}`);

  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send({ message: error.message });
  //   }
  // }

  static async addNewTag(req, res) {
    const { tags } = req.body; // Menangkap array tag dari body request
    const PostId = req.params.PostId; 
    const UserId = req.session.userId;
  
    try {
      const tagList = tags.split(",").map(tag => tag.trim()); 
  
      const createdTags = await Promise.all(
        tagList.map(async tag => {
          
          const [newTag] = await Tag.findOrCreate({ 
            where: { tag }, 
            defaults: { tag }
          });
  
          
          await PostTag.create({
            PostId: PostId,
            TagsId: newTag.id 
          });
        })
      );
  
      res.redirect(`/posts/YourPost/${UserId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  }

  static async deleteTag(req, res) {
    const PostId = req.params.PostId; 
    const TagsId = req.params.TagsId; 
    const UserId = req.session.userId;
  
    try {
      await PostTag.destroy({
        where: {
          PostId,
          TagsId
        }
      });
  
      res.redirect(`/posts/YourPost/${UserId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  }
  
}

module.exports = TagController;
