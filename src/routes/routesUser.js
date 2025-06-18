const express = require('express')
const router = express.Router()
const validarUser = require('../controllers/validarUser')

router.get('/', validarUser.obtenerTodos)
router.get('/:id', validarUser.obtenerUno)
router.post('/', validarUser.crear)
router.put('/:id', validarUser.editar)
router.delete('/:id', validarUser.eliminar)

module.exports = router
