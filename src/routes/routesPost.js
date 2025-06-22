const express = require('express')
const router = express.Router()
const validarPost = require('../controllers/postController')

router.get('/', validarPost.obtenerTodos)
router.get('/:id', validarPost.obtenerUno)
router.post('/', validarPost.crear)
router.put('/:id', validarPost.editar)
router.delete('/:id', validarPost.eliminar)

module.exports = router
