const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ mensaje: 'Token faltante' })

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.userId = decoded.id
    next()
  } catch (err) {
    res.status(401).json({ mensaje: 'Token inválido' })
  }
}
