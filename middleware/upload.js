const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "rmt-54-webubble",
		allowedFormats: ["jpeg", "png", "gif", "jpg", "svg"],
		transformation: [
			{
				width: 500,
				height: 500,
				crop: "limit",
			},
		],
	},
});

const upload = multer({
	storage: storage,
limits: {
	fileSize: 3 * 1024 * 1024,
},
});

module.exports = upload;
