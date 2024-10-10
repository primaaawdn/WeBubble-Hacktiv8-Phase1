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

router.use(function(req, res, next){
  if(!req.session.userId){
    const error = 'Please login first!'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
})

router.post("/tags", TagController.getTag)
router.post("/posts/:PostId/tag", TagController.addNewTag);

// router.get("/posts/tags/:TagId");
// router.get("/tags/:TagId/delete");


module.exports = router;