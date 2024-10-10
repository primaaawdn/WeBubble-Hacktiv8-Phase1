const { body } = require("express-validator");

module.exports = [
  body("body")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("content is required")
    .isLength({ max: 300 })
    .withMessage("Max 300 charactes"),
];