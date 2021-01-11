const { check, validationResult } = require("express-validator");

exports.terrainRules = () => [
  check("name", "name is required").notEmpty(),
  check("address", "address is required").notEmpty(),
  check("phone", "phone is required").notEmpty().isNumeric(),
  check("format", "format is required").notEmpty(),
  check("type", "type is required").notEmpty(),
  check("surface", "surface is required").notEmpty(),
  check("price", "price is required").notEmpty().isNumeric(),
];
exports.validation = (req, res, next) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((er) => ({
        msg: er.msg,
      })),
    });
  }
  next();
};
