const { body } = require("express-validator");

module.exports = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isEmail()
    .withMessage("Invalid username")
    .custom((value) => {
      if (!value.includes("user")) {
        throw new Error("Username must not be empty");
      }

      return true;
    }),

  body("password").notEmpty().withMessage("Password is required"),
];