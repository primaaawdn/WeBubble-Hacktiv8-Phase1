const TagController = require("../controllers/tagController");
const router = require("express").Router();

<<<<<<< HEAD

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

=======
// router.get("/tags");
>>>>>>> 911acf9238042d83f8402c342dfdfa44f22430b5
// router.get("/posts/tags/:TagId");
// router.get("/tags/:TagId/delete");


module.exports = router;