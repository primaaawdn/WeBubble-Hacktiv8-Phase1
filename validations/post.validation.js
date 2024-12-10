const { body } = require("express-validator");

module.exports = [
  body("body")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("content is required")
    .isLength({ max: 280 })
    .withMessage("Max 280 charactes"),
];