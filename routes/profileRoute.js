const ProfileController = require("../controllers/profileController");
const router = require("express").Router();
const uploadController = require('../controllers/uploadController');

router.use(function (req, res, next) {
    if (!req.session.userId) {
        const error = `Please login first`;
        return res.redirect(`/login?srror=${error}`);
    } else {
        next();
    }
});

router.get("/profile", ProfileController.profilePage);
router.get("/users/:UserId/profile", ProfileController.getProfile);
router.get("/users/:UserId/profile/create", ProfileController.createForm);


router.post("/users/:UserId/profile/create", 
    uploadController.uploadMiddleware, 
    ProfileController.createProfile 
);

router.get("/users/:UserId/profile/edit/:ProfileId", ProfileController.editProfileForm);
router.post("/users/:UserId/profile/edit/:ProfileId", ProfileController.editProfile);

module.exports = router;
