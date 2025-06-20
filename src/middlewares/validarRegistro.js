const { body, validationResult } = require('express-validator')

exports.validarRegistro = [
  body('nickname').trim().notEmpty().withMessage('El nickname es obligatorio'),
  body('password').isLength({ min: 6 }),
  (req, res, next) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() })
    next()
  }
]