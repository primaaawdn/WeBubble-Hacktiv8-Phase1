const { User, Profile } = require("../models");

const ensureAuthenticated = async (req, res, next) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect("/login"); 
    }

    const user = await User.findOne({
        where: { id: userId },
        include: { model: Profile },
    });

    if (!user || !user.Profile || !user.Profile.name) {
        req.session.isProfileComplete = false;
        return res.redirect("/users/:UserId/profile/create"); 
    }

    req.session.isProfileComplete = true;
    next();
};

module.exports = ensureAuthenticated;
