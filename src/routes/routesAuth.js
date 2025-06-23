const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const validarUser = require('../middleware/validarUser')

router.post('/login', authController.login)
router.post('/register', validarUser, authController.register)

module.exports = router
