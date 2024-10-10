const { body } = require("express-validator");

module.exports = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isEmail()
    .withMessage("Invalid username format")
    .custom((value) => {
      if (!value.includes("user")) {
        throw new Error("Username must include 'user'");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
