const { body, validationResult } = require('express-validator');
const validatePost = [
  body('description')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isString().withMessage('La descripción debe ser un texto')
    .isLength({ max: 500 }).withMessage('La descripción no puede superar los 500 caracteres'),

  body('images')
    .optional()
    .isArray().withMessage('Las imágenes deben estar en un arreglo'),

  body('images.*')
    .optional()
    .isURL().withMessage('Cada imagen debe ser una URL válida'),

  body('tags')
    .optional()
    .isArray().withMessage('Las etiquetas deben estar en un arreglo'),

  body('tags.*')
    .optional()
    .isMongoId().withMessage('Cada etiqueta debe ser un ID válido'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validatePost;
