const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Nuevas rutas de seguidores
router.post('/follow/:id', userController.seguirUsuario)
router.post('/unfollow/:id', userController.dejarDeSeguirUsuario)

router.get('/', userController.obtenerTodos)
router.get('/:id', userController.obtenerUno)
router.post('/', userController.crear)
router.put('/:id', userController.editar)
router.delete('/:id', userController.eliminar)

module.exports = router
