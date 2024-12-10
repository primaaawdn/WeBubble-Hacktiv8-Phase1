
const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");
const upload = require("../middleware/upload");

router.use((req, res, next) => {
    if (!req.session.userId) {
        const error = "Please login first";
        return res.redirect(`/login?error=${error}`);
    } else {
        next();
    }
});


router.get("/posts", PostController.getPost);
router.get("/posts/:PostId", PostController.ViewPost);
router.get("/users/:UserId/posts/create", PostController.createPost);
router.post("/users/:UserId/posts/create", upload.single('imageUrl'), PostController.postNewPost);
router.get("/posts/YourPost/:UserId", PostController.YourPost);
router.get("/posts/YourPost/:UserId/:PostId/edit", PostController.getEdit);
router.post("/posts/YourPost/:UserId/:PostId/edit", upload.single('imageUrl'), PostController.postEdit);
router.get("/posts/YourPost/:UserId/:PostId/delete", PostController.removePost);

module.exports = router;
