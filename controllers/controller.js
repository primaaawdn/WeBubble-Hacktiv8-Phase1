const { User } = require("../models");
const bcrypt = require('bcrypt');

class Controller {
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
            const user = await User.findOne({ where: { username } }); 

            if (!user) {
                return res.status(401).send("Invalid username or password.");
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).send("Invalid username or password.");
            }
            req.session.userId = user.id;
            res.redirect('/posts');
        } catch (error) {
            res.send(error.message);
            if(error.name === "SequelizeValidationError"){
                let errors = error.errors.map(e => e.message)
                res.send(errors)
              }
        }
    }
    static logout(req, res) {
        if (req.session) {
            req.session.destroy(error => {
                if (error) {
                    console.error("Session destroy error:", error);
                    return res.status(500).send("Error logging out.");
                }
                res.redirect('/');
            });
        } else {
            res.redirect('/'); 
        }
    }
}

module.exports = Controller;