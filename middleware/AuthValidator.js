const { check, validationResult } = require("express-validator");
exports.registerRules = () => [
  check("fullName", "name is required").notEmpty(),
  check("email", "email must not be empty or is incorrect").isEmail(),
  check("password", "password is required").isLength({ min: 6, max: 20 }),
  check(
    "confirmationPassword",
    "confirmationPassword field must have the same value as the password field"
  ).custom((value, { req }) => value === req.body.password),
];

exports.loginRules = () => [
  check("email", "email must not be empty or is incorrect").isEmail(),
  check("password", "password is required and must be 6+ chars").isLength({
    min: 6,
    max: 20,
  }),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((er) => ({
        msg: er.msg,
      })),
    });
  }
  next();
};
