const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", Controller.landing);
router.get("/login", Controller.loginPage);
router.post("/login", Controller.login);
router.get("/logout", Controller.logout);

module.exports = router;