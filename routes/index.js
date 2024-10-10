const express = require("express");
const { body } = require("express-validator");
const loginValidation = require("../validations/login.validation");
const Controller = require("../controllers/controller");

const router = express.Router();

// Define routes
router.get("/", Controller.landing);
router.get("/login", Controller.loginPage);
router.post("/login", loginValidation, Controller.login);
router.get("/logout", Controller.logout);



module.exports = router;
