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
            } // nanti harus benerin validasi lagi

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).send("Invalid username or password.");
            } // nanti harus benerin validasi lagi

            res.redirect('/posts');
        } catch (error) {
            res.send(error.message);
        }
    }
    static async createAccountForm(req, res) {
        try {
            res.render('CreateForm');
        } catch (error) {
            res.send(error.message);
        }
    }
    static async createAccount(req, res) {
        try {
            const { username, email, password, role } = req.body;

            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).send("Username already exists.");
            } // nanti harus benerin validasi lagi

            const existingEmail = await User.findOne({ where: { email } });
            if (existingEmail) {
                return res.status(400).send("Email already exists.");
            } // nanti harus benerin validasi lagi

            const newUser = await User.create({ username, email, password, role });
            res.redirect('/login');
        } catch (error) {
            res.send(error.message);
        }
    }

    static logout(req, res) {
        if (req.session) {
            req.session.destroy(error => {
                if (error) {
                    console.error("Session destroy error:", error);
                    return res.status(500).send("Error logging out.");
                } // nanti harus benerin validasi lagi
                res.redirect('/');
            });
        } else {
            res.redirect('/'); 
        }
    }
}

module.exports = UserController;