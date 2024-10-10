const express = require("express");
const session = require('express-session');
const csrf = require("csurf");
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const router = require('./routes/index');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const profileRoute = require('./routes/profileRoute');
const tagRoute = require('./routes/tagRoute');

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); 
    next();
});

app.use(router);
app.use(userRoute);
app.use(postRoute);
app.use(profileRoute);
app.use(tagRoute);

app.get('/form', (req, res) => {
    res.render('form', { csrfToken: res.locals.csrfToken }); // Kirim token ke view
});

app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRF') {
        return res.status(403).send('Invalid CSRF token');
    }
    next(err);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
