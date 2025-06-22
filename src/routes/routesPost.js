const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const upload = require('../middleware/uploadMiddleware')
const validarPost = require('../middleware/validarPost')

router.post('/', upload.array('images'), postController.crear)

router.get('/', postController.obtenerTodos)
router.get('/:id', postController.obtenerUno)
router.post('/', validarPost, postController.crear)
router.put('/:id', validarPost, postController.editar)
router.delete('/:id', postController.eliminar)

module.exports = router
