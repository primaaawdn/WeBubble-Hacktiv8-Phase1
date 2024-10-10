const UserController = require("../controllers/userController");
const router = require("express").Router();
<<<<<<< HEAD
=======
// const isAuthenticated = require('../middleware/auth');
// router.use(isAuthenticated);
>>>>>>> 911acf9238042d83f8402c342dfdfa44f22430b5

router.get("/users", UserController.getAllUsers)
router.get("/users/create", UserController.createAccountForm);
router.post("/users/create", UserController.createAccount);

module.exports = router;