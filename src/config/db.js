const mongoose = require('mongoose')
require('dotenv').config()

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Conectado a MongoDB')
    } catch (error) {
        console.log('Error en conectar con MongoDB: ', error.message)
    }
}

module.exports = conectarDB