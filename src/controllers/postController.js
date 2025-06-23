const Post = require('../models/post')
const crearControladorCRUD = require('./crudController')
const redis = require('../config/redisClient')

const controladorPost = crearControladorCRUD(Post, ['user', 'tags'])

//Sobrescribir GET /posts con cache Redis
controladorPost.obtenerTodos = async (req, res) => {
  const cacheKey = 'all_posts'

  try {
    const cached = await redis.get(cacheKey)
    if (cached) {
      return res.json({ fuente: 'redis', posts: JSON.parse(cached) })
    }

    const posts = await Post.find().populate('user tags')
    await redis.set(cacheKey, JSON.stringify(posts), 'EX', 60)

    res.json({ fuente: 'mongo', posts })
  } catch (error) {
    console.error('Error al obtener posts:', error)
    res.status(500).json({ error: error.message })
  }
}

// Sobrescribir POST /posts con imagen y limpiar cache
controladorPost.crear = async (req, res) => {
  try {
    const imagePaths = req.files?.map(file => file.path) || []

    const nuevo = new Post({
      ...req.body,
      images: imagePaths,
      user: req.user?.id || req.body.user
    })

    await nuevo.save()

    //Borrar cache de lista de posts
    await redis.del('all_posts')

    res.status(201).json(nuevo)
  } catch (error) {
    console.error('Error al crear post:', error)
    res.status(400).json({ error: error.message })
  }
}

module.exports = controladorPost
