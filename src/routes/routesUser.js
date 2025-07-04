const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticateToken = require('../middleware/authentication')
const validarUser = require('../middleware/validarUser')

// Nuevas rutas de seguidores
router.post('/follow/:id', authenticateToken, userController.seguirUsuario)
router.post('/unfollow/:id', authenticateToken, userController.dejarDeSeguirUsuario)

router.get('/', userController.obtenerTodos)
router.get('/:id', authenticateToken, userController.obtenerUno)
router.post('/', userController.crear)
router.put('/:id', validarUser, userController.editar)
router.delete('/:id', userController.eliminar)

module.exports = router
