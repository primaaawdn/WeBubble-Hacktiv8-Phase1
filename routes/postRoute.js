const PostController = require("../controllers/postController");

const router = require("express").Router();

router.use(function (req, res, next) {
  if (!req.session.userId) {
      const error = `Please login first`
      return res.redirect(`/login?srror=${error}`);
  }else {
      next()
  }
})

router.get("/posts", PostController.getPost);
router.get("/posts/:PostId", PostController.ViewPost);
router.get("/users/:UserId/posts/create", PostController.createPost);
router.post("/users/:UserId/posts/create", PostController.postNewPost);
router.get("/posts/YourPost/:UserId", PostController.YourPost);
router.get("/posts/YourPost/:UserId/:PostId/edit", PostController.getEdit);
router.post("/posts/YourPost/:UserId/:PostId/edit", PostController.postEdit);
router.get("/posts/YourPost/:UserId/:PostId/delete", PostController.removePost);


module.exports = router;