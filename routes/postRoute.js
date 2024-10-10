const PostController = require("../controllers/postController");

const router = require("express").Router();

router.get("/posts", PostController.getPost);
router.get("/posts/:PostId", PostController.ViewPost);
router.get("/users/:UserId/posts/create", PostController.createPost);
router.post("/users/:UserId/posts/create", PostController.postNewPost);
router.get("/posts/YourPost/:UserId", PostController.YourPost);
router.get("/posts/YourPost/:UserId/:PostId/edit", PostController.getEdit);
router.post("/posts/YourPost/:UserId/:PostId/edit", PostController.postEdit);
router.get("/posts/YourPost/:UserId/:PostId/delete", PostController.removePost);


module.exports = router;