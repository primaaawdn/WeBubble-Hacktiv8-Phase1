const express = require("express");
const session = require('express-session');
// const multer = require('multer');
const path = require('path');
const upload = require('./middleware/upload'); 


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); 
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); 
//     }
// });


// const upload = multer({ storage: storage });


const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true 
    }
}));


app.post('/submit', upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'imageUrl', maxCount: 1 }]), (req, res) => {
    try {
       
        const name = req.body.name; 
        const gender = req.body.gender; 
        const bio = req.body.bio; 
        const group = req.body.group; 
        const content = req.body.content; 

        
        const profilePicture = req.files['profilePicture'] ? req.files['profilePicture'][0] : null;
        const imageUrl = req.files['imageUrl'] ? req.files['imageUrl'][0] : null;

        
        res.send(`
            ${name ? `Profile submitted! <br>Name: ${name} <br>Gender: ${gender} <br>Bio: ${bio} <br>Group: ${group} <br>Profile Photo path: ${profilePicture.path}<br><br>` : ''}
            ${content ? `Content submitted! <br>Content: ${content} <br>Content Photo path: ${imageUrl.path}` : ''}
        `);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


const router = require('./routes/index');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const profileRoute = require('./routes/profileRoute');
const tagRoute = require('./routes/tagRoute');


app.use(router);
app.use(userRoute);
app.use(postRoute);
app.use(profileRoute);
app.use(tagRoute);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
