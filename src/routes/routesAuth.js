const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authenticateToken = require('../middleware/authentication')

router.post('/login', authenticateToken, authController.login)
router.post('/register', authController.register)

module.exports = router
