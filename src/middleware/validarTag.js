const { body, validationResult } = require('express-validator');
const validateTag = [
  body('name')
    .notEmpty().withMessage('El nombre de la etiqueta es obligatorio')
    .isString().withMessage('El nombre debe ser un texto')
    .isLength({ max: 50 }).withMessage('El nombre no puede superar los 50 caracteres'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateTag;
