function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
        const error = 'Please login first!';
        return res.redirect(`/login?error=${encodeURIComponent(error)}`);
    }
    next();
}

module.exports = isAuthenticated;
