const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

// Importar rutas
const routesUser = require('./routes/routesUser')
const routesPost = require('./routes/routesPost')
const routesComment = require('./routes/routesComment')
const routesTag = require('./routes/routesTag')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Rutas
app.use('/users', routesUser)
app.use('/posts', routesPost)
app.use('/comments', routesComment)
app.use('/tags', routesTag)

app.get("/", (req, res) => {
    res.send("Hola mundo")
})

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, console.log('MONGO_URI:', process.env.MONGO_URI))
.then(() => {
  console.log('Conectado a MongoDB')
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  })
})
.catch(err => {
  console.error('Error al conectar a MongoDB:', err)
})
