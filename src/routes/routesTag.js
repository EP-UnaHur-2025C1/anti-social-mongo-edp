const express = require('express')
const router = express.Router()
const tagController = require('../controllers/tagController')
const validarTag = require('../middleware/validarTag')

router.get('/', tagController.obtenerTodos)
router.get('/:id', tagController.obtenerUno)
router.post('/', tagController.crear)
router.put('/:id', tagController.editar)
router.delete('/:id', tagController.eliminar)

module.exports = router