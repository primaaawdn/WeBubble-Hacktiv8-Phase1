class UserController {
    static async landing(req, res) {
        try {
            res.render("Landing");
        } catch (error) {
            res.send(error.message);
        }
    }

    // static loginPage(req, res) {
    //     res.render('Login'); 
    // }


    // static login(req, res) {

    //     res.redirect('/');
    // }

    // static logout(req, res) {

    //     res.redirect('/');
    // }
}

module.exports = UserController;