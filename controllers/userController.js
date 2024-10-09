const { User, Profile, Tag, Post, PostTag } = require("./models");
const bcrypt = require('bcrypt');

class UserController {
    static async landing(req, res) {
		try {
			res.render("Landing");
		} catch (error) {
			res.send(error.message);
		}
	}

    static loginPage(req, res) {
      res.render('Login'); 
    }
}