const express = require('express')
const router = express.Router()
const validarComment = require('../controllers/commentController')

router.get('/', validarComment.obtenerTodos)
router.get('/:id', validarComment.obtenerUno)
router.post('/', validarComment.crear)
router.put('/:id', validarComment.editar)
router.delete('/:id', validarComment.eliminar)

module.exports = router
