const jwt = require('jsonwebtoken');
const User = require('../models/User'); // lo podemos sacar si quieren

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o mal formado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id); // con esto buscamos a un usario
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = authenticateToken;
