const { body, validationResult } = require('express-validator')
const validateComment = [
  body('content')
    .notEmpty().withMessage('El comentario no puede estar vacío')
    .isString().withMessage('El comentario debe ser un texto')
    .isLength({ max: 300 }).withMessage('El comentario no puede superar los 300 caracteres'),

  body('post')
    .notEmpty().withMessage('Debe especificarse el ID del post')
    .isMongoId().withMessage('El ID del post debe ser válido'),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]
module.exports = validateComment
