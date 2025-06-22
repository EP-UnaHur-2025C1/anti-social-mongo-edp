const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log('Authorization Header:', authHeader) 

    const token = authHeader && authHeader.split(' ')[1]
    console.log('Token extraído:', token) 

    if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error('Error al verificar el token:', err)
            return res.status(403).json({ mensaje: 'Token inválido o expirado' })
        }
        req.user = user
        next()
    })
}


module.exports = authenticateToken