const express = require("express");
const session = require('express-session');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();
const port = 3000;

// app.post('/upload', upload.single('file'), (req, res) => {
//     res.send('File uploaded successfully.');
//   });

const router = require('./routes/index');
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
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite:true }
}));

app.use(router);
app.use(userRoute);
app.use(postRoute);
app.use(profileRoute);
app.use(tagRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});