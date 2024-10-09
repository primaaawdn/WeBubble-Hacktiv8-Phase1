const {
	postController,
	profileController,
	userController,
} = require("../controllers");

const router = require("express").Router();

router.get("/users/create");
router.post("/users/create");
router.get("/users/:UserId/edit");
router.post("/users/:UserId/edit");
router.post("/users/:UserId/delete");


module.exports = router;