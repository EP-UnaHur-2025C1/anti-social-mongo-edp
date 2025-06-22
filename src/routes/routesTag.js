const express = require('express')
const router = express.Router()
const validarTag = require('../controllers/tagController')

router.get('/', validarTag.obtenerTodos)
router.get('/:id', validarTag.obtenerUno)
router.post('/', validarTag.crear)
router.put('/:id', validarTag.editar)
router.delete('/:id', validarTag.eliminar)

module.exports = router