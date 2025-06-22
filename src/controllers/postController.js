const Post = require('../models/post')
const crearControladorCRUD = require('./crudController')

module.exports = crearControladorCRUD(Post, ['user', 'tags'])
