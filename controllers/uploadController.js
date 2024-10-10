
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 


exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('File uploaded successfully.');
};


exports.uploadMiddleware = upload.single('file');
