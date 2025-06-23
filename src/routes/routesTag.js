const express = require('express')
const router = express.Router()
const tagController = require('../controllers/tagController')

router.get('/', tagController.obtenerTodos)
router.get('/:id', tagController.obtenerUno)
router.post('/', tagController.crear)
router.put('/:id', tagController.editar)
router.delete('/:id', tagController.eliminar)

module.exports = router