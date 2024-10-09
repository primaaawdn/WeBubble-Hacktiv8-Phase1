const {
	postController,
	profileController,
	userController,
} = require("../controllers");

const router = require("express").Router();

router.get("/tags");
router.get("/posts/tags/:TagId");
router.get("/tags/:TagId/delete");


module.exports = router;