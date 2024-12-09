const express = require("express");
const ProfileController = require("../controllers/profileController");
const router = express.Router();
const upload = require("../middleware/upload");

router.use((req, res, next) => {
	if (!req.session.userId) {
		const error = "Please login first";
		return res.redirect(`/login?error=${error}`);
	}
	next();
});

router.get("/profile", ProfileController.profilePage);
router.get("/users/:UserId/profile", ProfileController.getProfile); 
router.get("/users/:UserId/profile/create", ProfileController.createForm); 
router.post(
	"/users/:UserId/profile/create",
	upload.single('profilePicture'),
	ProfileController.createProfile 
);
router.get("/users/:UserId/profile/edit", ProfileController.editProfileForm); 
router.post("/users/:UserId/profile/edit", ProfileController.editProfile); 

module.exports = router;