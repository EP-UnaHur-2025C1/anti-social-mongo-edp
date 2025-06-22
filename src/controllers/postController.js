const Post = require('../models/post')
const crearControladorCRUD = require('./crudController')

const controladorPost = crearControladorCRUD(Post, ['user', 'tags'])

// Sobrescribir "crear" solo para el modelo Post con manejo de imágenes
controladorPost.crear = async (req, res) => {
  try {
    const imagePaths = req.files?.map(file => file.path) || []

    const nuevo = new Post({
      ...req.body,
      images: imagePaths,
      user: req.user?.id || req.body.user // fallback si no hay authMiddleware
    })

    await nuevo.save()
    res.status(201).json(nuevo)
  } catch (error) {
    console.error('Error al crear post:', error)
    res.status(400).json({ error: error.message })
  }
}

module.exports = controladorPost
