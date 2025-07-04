require('dotenv').config()
const mongoose = require('mongoose')

const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')
const Tag = require('../models/tag')

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('Conectado a MongoDB', process.env.DB_URI)
  } catch (err) {
    console.error('Error de conexión:', err)
    process.exit(1)
  }
}

async function seedDatabase() {
  try {
    // Eliminar todo
    await Promise.all([
      User.deleteMany(),
      Post.deleteMany(),
      Comment.deleteMany(),
      Tag.deleteMany()
    ])

    // Insertar usuarios
    const users = await User.insertMany([
      { nickname: 'carryxn', email: 'carryxn@mail.com', password: '123456' },
      { nickname: 'trito', email: 'trito@mail.com', password: '123456' },
      { nickname: 'messias', email: 'messias@mail.com', password: '123456' }
    ])

    // Insertar tags
    const tags = await Tag.insertMany([
      { name: 'javascript' },
      { name: 'unahur' },
      { name: 'backend' }
    ])

    // Insertar posts
    const posts = await Post.insertMany([
      {
        user: users[0]._id,
        text: 'Hola mundo!',
        createdAt: new Date(),
        images: ['uploads/198642058.webp'], // imagen local
        tags: [tags[0]._id, tags[1]._id]
      },
      {
        user: users[1]._id,
        text: 'Probando MongoDB con seeders',
        createdAt: new Date(),
        tags: [tags[2]._id]
      }
    ])

    // Insertar comentarios
    await Comment.insertMany([
      {
        post: posts[0]._id,
        user: users[1]._id,
        content: 'Muy buen post!',
        createdAt: new Date(),
        visible: true
      },
      {
        post: posts[0]._id,
        user: users[2]._id,
        content: 'Me encanta esta red social',
        createdAt: new Date(),
        visible: true
      }
    ])

    console.log('Seeders completados con éxito')
    process.exit()
  } catch (err) {
    console.error('Error al cargar datos:', err)
    process.exit(1)
  }
}

connectDB().then(seedDatabase)
