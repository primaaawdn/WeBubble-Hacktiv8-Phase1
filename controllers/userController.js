const { User } = require("../models");
const bcrypt = require('bcrypt');

class UserController {
    static async landing(req, res) {
        try {
            res.render("Landing");
        } catch (error) {
            res.send(error.message);
        }
    }
    static async loginPage(req, res) {
        try {
            res.render('Login');
        } catch (error) {
            res.send(error.message);
        }  
    }
    static async login(req, res) {
        try {
            const { username, password } = req.body;
            console.log(req.body);
            const user = await User.findOne({ where: { username } }); 

            if (!user) {
                return res.status(401).send("Invalid username or password.");
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).send("Invalid username or password.");
            }

            res.redirect('/posts');
        } catch (error) {
            res.send(error.message);
        }
    }
    

    // static logout(req, res) {

    //     res.redirect('/');
    // }
}

module.exports = UserController;