const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const validateComment = require('../middleware/validarComment')

router.get('/', commentController.obtenerTodos)
router.get('/:id', commentController.obtenerUno)
router.post('/', validateComment, commentController.crear)
router.put('/:id', validateComment, commentController.editar)
router.delete('/:id', commentController.eliminar)

module.exports = router
