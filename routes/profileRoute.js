const ProfileController = require("../controllers/profileController");
const router = require("express").Router();

router.get("/users/:UserId/profile", ProfileController.getOrCreate);
router.get("/users/:UserId/profile/create", ProfileController.createForm);
router.post("/users/:UserId/profile/create", ProfileController.createProfile);
router.get("/users/:UserId/profile/:profileId", ProfileController.getProfile);
// router.get("/users/:UserId/profile/:profileId/edit");
// router.post("/users/:UserId/profile/:profileId/edit");

module.exports = router;