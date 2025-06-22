require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//const jwt = require('jsonwebtoken')
const app = express()
const PORT = process.env.PORT || 3000

const routesUser = require('./routes/routesUser')
const routesPost = require('./routes/routesPost')
const routesComment = require('./routes/routesComment')
const routesTag = require('./routes/routesTag')
const authRoutes = require('./routes/routesAuth')

app.use(cors())
app.use(express.json())

app.use('/users', routesUser)
app.use('/posts', routesPost)
app.use('/comments', routesComment)
app.use('/tags', routesTag)
app.use('/auth', authRoutes)
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

//TESTEOS
//app.get('/testUsers', authenticateToken, (req, res) => {
//  res.json(testUsers.filter(testUser => testUser.nickname === req.user.name))
//})

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// Conexión a MongoDB y arranque del servidor
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Conectado a MongoDB')
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err)
  })
