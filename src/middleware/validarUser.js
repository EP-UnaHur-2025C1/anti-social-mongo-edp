const { body, validationResult } = require('express-validator')

const validateUser = [
  body('nickname')
    .notEmpty().withMessage('El nickname es obligatorio')
    .isString().withMessage('El nickname debe ser un texto')
    .isLength({ max: 30 }).withMessage('El nickname no puede tener más de 30 caracteres'),

  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

module.exports = validateUser
