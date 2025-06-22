const jwt = require('jsonwebtoken');
require('dotenv').config()

const testUsers = [
  {
    nickname: 'carry0xn',
    email: 'caro@example.com',
    password: '123456'
  },
  {
    nickname: 'tritoneros',
    email: 'nicogil@example.com',
    password: '123456'
  }
]

const login = (req, res) => {
  const { nickname } = req.body;
  const user = testUsers.find(u => u.nickname === nickname);

  if (!user) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  const payload = { name: user.nickname };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

  res.json({ accessToken })
}

const register = (req, res) => {
  const { nickname, email, password } = req.body
  const existe = testUsers.find(u => u.nickname === nickname || u.email === email)

  if (existe) {
    return res.status(400).json({ mensaje: 'Ya existe un usuario con ese nickname o email' })
  }
  const nuevoUsuario = { nickname, email, password };
  testUsers.push(nuevoUsuario)

  res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario })
}

module.exports = {
  login,
  register
}
