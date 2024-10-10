const express = require("express");
const session = require('express-session');
const csrf = require("csurf");

const app = express();
const port = 3000;

// Import routes
const router = require('./routes/index');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const profileRoute = require('./routes/profileRoute');
const tagRoute = require('./routes/tagRoute');

// Set view engine
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Setup session
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Ubah menjadi true jika menggunakan HTTPS
}));

// Setup CSRF protection
const csrfProtection = csrf({ cookie: { httpOnly: true } });
app.use(csrfProtection);

// Middleware untuk menambahkan token CSRF ke response
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // Menyimpan token CSRF di locals
    next();
});

// Use routes
app.use(router);
app.use(userRoute);
app.use(postRoute);
app.use(profileRoute);
app.use(tagRoute);

// Contoh rute yang menggunakan CSRF token
app.get('/form', (req, res) => {
    res.render('form', { csrfToken: res.locals.csrfToken }); // Kirim token ke view
});

// Error handling untuk CSRF
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRF') {
        return res.status(403).send('Invalid CSRF token');
    }
    next(err);
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
