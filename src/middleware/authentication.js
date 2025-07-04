const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o mal formado' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    //Buscamos por nickname 
    const user = await User.findOne({ nickname: decoded.name })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    req.user = {
      id: user._id,
      nickname: user.nickname,
      email: user.email
    }
    next()
  } catch (err) {
    console.error('Error de autenticación:', err.message)
    return res.status(403).json({ message: 'Token inválido o expirado' })
  }
}

module.exports = authenticateToken

