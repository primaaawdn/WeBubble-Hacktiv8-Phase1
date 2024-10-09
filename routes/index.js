const {
	controller,
    postController,
	profileController,
	userController,
} = require("../controllers");

const router = require("express").Router();

router.get("/");
router.get("/login");
router.post("/login");
router.get("/logout");

router.get("/users/idols");
router.get("/users/managers");


module.exports = router;
