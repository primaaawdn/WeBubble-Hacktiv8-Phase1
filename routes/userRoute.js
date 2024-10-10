const UserController = require("../controllers/userController");
const router = require("express").Router();

router.use(function(req, res, next){
  if(!req.session.userId){
    const error = 'Please login first!'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
})

router.get("/users", UserController.getAllUsers)
router.get("/users/create", UserController.createAccountForm);
router.post("/users/create", UserController.createAccount);

module.exports = router;