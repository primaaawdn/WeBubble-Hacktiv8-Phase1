const ProfileController = require("../controllers/profileController");
const router = require("express").Router();

router.get("/profile", ProfileController.profilePage);
router.get("/users/:UserId/profile/create", ProfileController.createForm);
router.post("/users/:UserId/profile/create", ProfileController.createProfile);
router.get("/users/:UserId/profile/:ProfileId", ProfileController.getProfile);
router.get("/users/:UserId/profile/:ProfileId/edit", ProfileController.editProfileForm);
router.post("/users/:UserId/profile/:ProfileId/edit", ProfileController.editProfile);

module.exports = router;