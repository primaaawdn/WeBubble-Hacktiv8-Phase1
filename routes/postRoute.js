const {
	postController,
	profileController,
	userController,
} = require("../controllers");

const router = require("express").Router();

router.get("/posts");
router.get("/users/:UserId/posts");
router.get("/users/:UserId/posts/create");
router.post("/users/:UserId/posts/create");
router.get("/posts/:PostId");
router.get("/posts/:PostId/edit");
router.post("/posts/:PostId/edit");
router.get("/posts/:PostId/delete");


module.exports = router;