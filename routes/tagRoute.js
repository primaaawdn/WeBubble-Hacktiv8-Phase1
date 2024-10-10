const router = require("express").Router();

router.use(function(req, res, next){
  if(!req.session.userId){
    const error = 'Please login first!'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
})

// router.get("/tags");
// router.get("/posts/tags/:TagId");
// router.get("/tags/:TagId/delete");


module.exports = router;