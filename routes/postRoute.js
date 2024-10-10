const PostController = require("../controllers/postController");

const router = require("express").Router();

router.get("/posts", PostController.getPost);
router.get("/posts/:PostId", PostController.ViewPost);
router.get("/users/:UserId/posts/create", PostController.createPost);
router.post("/users/:UserId/posts/create", PostController.postNewPost);
// router.get("/posts/:PostId");
// router.get("/posts/:PostId/edit");
// router.post("/posts/:PostId/edit");
// router.get("/posts/:PostId/delete");


module.exports = router;