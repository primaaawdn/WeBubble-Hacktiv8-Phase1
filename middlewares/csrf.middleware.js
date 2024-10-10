const csrf = require("csurf");
const csrfProtection = csrf({ cookie: { secure: true, httpOnly: true } });

module.exports = csrfProtection;