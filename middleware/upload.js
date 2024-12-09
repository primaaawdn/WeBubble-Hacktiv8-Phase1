const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
	if (!allowedTypes.includes(file.mimetype)) {
		const error = new Error("Tipe file tidak diizinkan.");
		error.status = 400;
		cb(error, false);
	} else {
		cb(null, true);
	}
};

const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});

module.exports = upload;
