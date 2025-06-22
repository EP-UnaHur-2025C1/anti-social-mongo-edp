const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user')

/*const testUsers = [
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
]*/
const login = async (req, res) => {
  try {
    const { nickname } = req.body
    const user = await User.findOne({ nickname })

    if (!user) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' })
    }
    const payload = {
      id: user._id, 
      name: user.nickname
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)

    console.log("TOKEN:", accessToken)
    console.log("DECODED PAYLOAD:", jwt.decode(accessToken))
    console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET)
    
    res.json({ accessToken })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error })
  }
}


const register = async (req, res) => {
  try {
    const { nickname, email, password } = req.body

    const existe = await User.findOne({
      $or: [{ nickname }, { email }]
    })

    if (existe) {
      return res.status(400).json({ mensaje: 'Ya existe un usuario con ese nickname o email' })
    }

    const nuevoUsuario = new User({ nickname, email, password })
    await nuevoUsuario.save()

    res.status(201).json({
      mensaje: 'Usuario registrado con éxito',
      usuario: nuevoUsuario
    })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error })
  }
}

module.exports = {
  login,
  register
}
