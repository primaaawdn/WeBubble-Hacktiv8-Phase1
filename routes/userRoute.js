const UserController = require("../controllers/userController");
const router = require("express").Router();

router.get("/users", UserController.getAllUsers)
router.get("/users/create", UserController.createAccountForm);
router.post("/users/create", UserController.createAccount);

module.exports = router;