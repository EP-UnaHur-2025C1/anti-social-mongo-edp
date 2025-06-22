require('dotenv').config();
const mongoose = require('mongoose');

const User = require('../models/User');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Tag = require('../models/tag');

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error de conexión:', err);
    process.exit(1);
  }
}

async function seedDatabase() {
  try {
    await Promise.all([
      User.deleteMany(),
      Post.deleteMany(),
      Comment.deleteMany(),
      Tag.deleteMany()
    ]);

    const users = await User.insertMany([
      { nickName: 'carryxn' },
      { nickName: 'trito' },
      { nickName: 'messias' }
    ]);

    const tags = await Tag.insertMany([
      { name: 'javascript' },
      { name: 'unahur' },
      { name: 'backend' }
    ]);

    const posts = await Post.insertMany([
      {
        user: users[0]._id,
        description: 'Hola mundo desde UnaHur Anti-Social!',
        date: new Date(),
        images: ['https://via.placeholder.com/300'],
        tags: [tags[0]._id, tags[1]._id]
      },
      {
        user: users[1]._id,
        description: 'Probando MongoDB con seeders',
        date: new Date(),
        tags: [tags[2]._id]
      }
    ]);

    await Comment.insertMany([
      {
        post: posts[0]._id,
        user: users[1]._id,
        content: 'Muy buen post!',
        date: new Date(),
        visible: true
      },
      {
        post: posts[0]._id,
        user: users[2]._id,
        content: 'Me encanta esta red social',
        date: new Date(),
        visible: true
      }
    ]);

    console.log('Seeders completados con éxito');
    process.exit();
  } catch (err) {
    console.error('Error al sembrar datos:', err);
    process.exit(1);
  }
}

connectDB().then(seedDatabase);
