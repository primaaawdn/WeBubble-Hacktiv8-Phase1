const ProfileController = require("../controllers/profileController");
const router = require("express").Router();
// const isAuthenticated = require('../middleware/auth');
// router.use(isAuthenticated);

router.get("/profile", ProfileController.profilePage);
router.get("/users/:UserId/profile", ProfileController.getProfile);
router.get("/users/:UserId/profile/create", ProfileController.createForm);
router.post("/users/:UserId/profile/create", ProfileController.createProfile);
router.get("/users/:UserId/profile/edit/:ProfileId", ProfileController.editProfileForm);
router.post("/users/:UserId/profile/edit/:ProfileId", ProfileController.editProfile);

module.exports = router;