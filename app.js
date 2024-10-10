const express = require("express");
const session = require('express-session');
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

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
    secret: process.env.SESSION_SECRET || 'yourSecretKey', // Use env variable
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set to true in production with HTTPS
}));

// Setup CSRF protection
const csrfProtection = csrf({ cookie: { httpOnly: true } });
app.use(csrfProtection);

// Middleware for adding CSRF token to response
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // Store token in locals
    next();
});

// Use routes
app.use(router);
app.use(userRoute);
app.use(postRoute);
app.use(profileRoute);
app.use(tagRoute);

// Example route that uses CSRF token
app.get('/form', (req, res) => {
    res.render('form', { csrfToken: res.locals.csrfToken }); // Send token to view
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    // Logic to handle form data
    res.send("Form submitted successfully!");
});

// CSRF error handling
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRF') {
        return res.status(403).send('Invalid CSRF token');
    }
    next(err);
});

// General error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
