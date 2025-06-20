const jwt = require('jsonwebtoken')
const User = require('../models/user')

const generarToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)
}

module.exports = {
  async login(req, res) {
    const { nickname, password } = req.body
    const user = await User.findOne({ nickname }).select('+password')
    if (!user || user.password !== password) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' })
    }
    const token = generarToken(user)
    res.json({ token })
  },

  async register(req, res) {
    const nuevo = new User(req.body)
    await nuevo.save()
    const token = generarToken(nuevo)
    res.status(201).json({ token })
  }
}
