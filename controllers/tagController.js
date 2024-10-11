const { User, Profile, Tag, Post, PostTag } = require("../models");

class TagController{

  static async getTag(req, res){
    try {
      const dataTag = await Tag.findAll()

      res.send({dataTag})
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async addNewTag(req, res) {
    const { tag } = req.body; 

    try {
      await Tag.create({ tag });

      res.redirect('/tags')

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
  }
}

module.exports = TagController