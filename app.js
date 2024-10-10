const express = require("express");
const app = express();
const port = 3000;
const session = require('express-session');

const router = require('./routes/index')
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const profileRoute = require('./routes/profileRoute');
const tagRoute = require('./routes/tagRoute');

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(router);
app.use(userRoute);
app.use(postRoute);
app.use(profileRoute);
app.use(tagRoute);

// app.get("/", (req, res) => {
// 	res.send("Hello World!");
// });

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
