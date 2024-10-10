const Controller = require("../controllers/controller");

const {
  landing, 
  loginPage, 
  login, 
  logout
} = require('../controllers/controller')

const router = require("express").Router();
const { body } = require("express-validator");
const loginValidation = require("../validations/login.validation")


router.get("/", Controller.landing);
router.get("/login", Controller.loginPage);
router.post("/login", loginValidation, Controller.login);
router.get("/logout", Controller.logout);

module.exports = router;