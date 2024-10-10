const UserController = require("../controllers/userController");
const router = require("express").Router();


router.get("/users", UserController.getAllUsers)
router.get("/users/create", UserController.createAccountForm);
router.post("/users/create", UserController.createAccount);


// router.get("/users/idols"); --- JADI FILTER AJA
// router.get("/users/managers"); --- JADI FILTER AJA


// router.get("/users/:UserId/edit");
// router.post("/users/:UserId/edit");
// router.post("/users/:UserId/delete");


module.exports = router;