const TagController = require("../controllers/tagController");
const router = require("express").Router();

router.use(function (req, res, next) {
  if (!req.session.userId) {
      const error = `Please login first`
      return res.redirect(`/login?srror=${error}`);
  }else {
      next()
  }
})


router.post("/tags", TagController.getTag)
router.post("/posts/:PostId/tag", TagController.addNewTag);

module.exports = router;