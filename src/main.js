require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const routesUser = require('./routes/routesUser')
const routesPost = require('./routes/routesPost')
const routesComment = require('./routes/routesComment')
const routesTag = require('./routes/routesTag')
const authenticateToken = require('./middleware/authentication')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())


// Rutas protegidas (requieren token válido)
app.use('/users', routesUser)
app.use('/posts', routesPost)
app.use('/comments', routesComment)
app.use('/tags', routesTag)

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Hola mundo')
})

//TESTEOS
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

app.get('/testUsers', authenticateToken, (req, res) => {
  res.json(testUsers.filter(testUser => testUser.nickname === req.user.name))
})

app.post('/login', (req, res) => {
  const nickname = req.body.nickname
  const user = { name: nickname }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })
})

// Conexión a MongoDB y arranque del servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB')
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err)
  })
