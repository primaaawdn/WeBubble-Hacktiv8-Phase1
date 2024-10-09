const UserController = require("../controllers/userController");
const router = require("express").Router();

router.get("/", UserController.landing);
// router.get("/login", UserController.loginPage);

// router.get("/users/idols");
// router.get("/users/managers");


// router.get("/users/create");
// router.post("/users/create");
// router.get("/users/:UserId/edit");
// router.post("/users/:UserId/edit");
// router.post("/users/:UserId/delete");


module.exports = router;